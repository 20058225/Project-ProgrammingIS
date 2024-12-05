const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @@ MySQL Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
// @@ Create the pool
const pool = mysql.createPool(dbConfig);
// @@ Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL.');
        connection.release(); // Release the connection back to the pool
    }
});
const promisePool = pool.promise(); // Use promise-based queries

// @@ Endpoint to Add a User
app.post('/addUser', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required.');
    }
    let connection;
    try {
        connection = await pool.promise().getConnection();
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt
        const [result] = await connection.execute(
            'INSERT INTO users (userFullName, userEmail, userPassword) VALUES (?, ?, ?)',
            [username, email, password]
        );
        res.send('User added successfully.');
        console.log('User added successfully.');
    } catch (err) {
        console.error("Database Error:",err.message);
        res.status(500).send('Error saving user to the database.');
    } finally {
        if (connection) connection.release();
    }
});
// Endpoint to Login with a User
app.post('/getUser', async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
    if (!email || !password) {
        return res.status(400).send('Username and password are required.');
    }
    let connection;
    try {
        connection = await pool.promise().getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE userEmail = ? AND userPassword = ?',
            [email, password]
        );

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login successful.', user: rows[0] });
            console.log('Login successful.');
        } else {
            res.status(401).send('Invalid username or password.');
            console.log('Invalid username or password.');
        }
    } catch (err) {
        console.error('Error querying the database:', err.message);
        res.status(500).send('Error checking the user in the database.');
    } finally {
        if (connection) connection.release();
    }
});
// Endpoint to update specific fields using PATCH
app.patch('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
    const { userFullName, userEmail, userPassword } = req.body;

    console.log('Received update request:', { id, body: req.body });

    let updates = [];
    let params = [];

    if (userFullName) {
        updates.push('userFullName = ?');
        params.push(userFullName);
    }
    
    if (userEmail) {
        updates.push('userEmail = ?');
        params.push(userEmail);
    }

    if (userPassword) {
        updates.push('userPassword = ?');
        params.push(userPassword);
    }

    if (updates.length === 0) {
        return res.status(400).send('No fields provided for update.');
    }

    params.push(id); // Add id for WHERE clause

    try {
        const query = `UPDATE users SET ${updates.join(', ')} WHERE userID = ?`;
        console.log('Executing query:', query, 'with params:', params);

        const [result] = await promisePool.execute(query, params);

        if (result.affectedRows > 0) {
            res.send('User updated successfully.');
            console.log('User updated successfully');
        } else {
            console.log('User not found');
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error updating user.');
    }
});

// @@ Endpoint to Search a User
app.post('/searchUser', async (req, res) => {
    const { userId, fullName } = req.body;
    let query = 'SELECT * FROM users WHERE';
    const params = [];

    if (userId) {
        query += ' userID = ?';
        params.push(userId);
    }
    
    if (fullName) {
        if (params.length > 0) query += ' OR'; // If there's already a condition, add OR
        query += ' userFullName LIKE ?';
        params.push(`%${fullName}%`);
    }

    try {
        const [rows] = await promisePool.execute(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error searching users.');
    }
});
// @@ Endpoint to Delete a User
app.delete('/deleteUser/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        const [result] = await promisePool.execute('DELETE FROM users WHERE userID = ?', [userID]);
        if (result.affectedRows > 0) {
            res.send('User deleted successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user.');
    } 
});

// @@ Fallback to serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`, req.body);
    next();
});
process.on('SIGINT', () => {
    console.log('Closing MySQL pool...');
    pool.end((err) => {
        if (err) console.error('Error closing MySQL pool:', err);
        else console.log('MySQL pool closed.');
        process.exit(0);
    });
});

let currentOrderId = 1000;
const idFilePath = path.join(__dirname, 'lastOrderId.txt');

// Load the last used ID from file if it exists
if (fs.existsSync(idFilePath)) {
    currentOrderId = parseInt(fs.readFileSync(idFilePath, 'utf8'));
}

function generateOrderId() {
    const orderId = currentOrderId;
    currentOrderId++;
    
    // Save the new ID to file
    fs.writeFileSync(idFilePath, currentOrderId.toString());
    
    return `ORDER-${orderId}`;
}

// POST endpoint to save order
app.post('/saveOrder', (req, res) => {
    console.log('Received Order Data:', req.body);

    const orderData = req.body;

    const orderId = generateOrderId();
    orderData.orderId = orderId;

    if (!orderData.items || !orderData.total || !orderData.paymentMethod || !orderData.serverName || !orderData.pubName || !orderData.address || !orderData.date || !orderData.time) {
        console.error('Invalid order data:', orderData);
        return res.status(400).json({ error: 'Invalid order data' });
    }

    const filePath = path.join(__dirname, 'public', 'data', 'receipts.json');

    let existingData = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        existingData = JSON.parse(fileContent);
    }

    existingData.push(orderData);

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
            console.error('Error saving order:', err);
            return res.status(500).json({ error: 'Error saving order' });
        }
        console.log('Order saved successfully:', orderData);
        res.json({ message: 'Order saved successfully', orderId: orderData.orderId });
    });
});
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});