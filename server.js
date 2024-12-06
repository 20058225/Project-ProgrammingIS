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
    const { id } = req.params;
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required.');
    }
    let connection;
    try {
        connection = await pool.promise().getConnection();
                
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 
        console.log("Hashed Password:", hashedPassword); // Log the hashed password for debugging

        // Insert the user into the database
        const [result] = await connection.execute(
            'INSERT INTO users (userFullName, userEmail, userPassword) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.send('User added successfully.');
        res.status(200).json({ message: 'UserID created: ', user: id});

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

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    let connection;
    try {
        connection = await pool.promise().getConnection();

        // Fetch the user by email
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE userEmail = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).send('Invalid email or password.');
        }

        const user = rows[0];

        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password.');
        }

        res.status(200).json({ message: 'Login successful.', user });
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
process.on('SIGINT', () => {
    console.log('Closing MySQL pool...');
    pool.end((err) => {
        if (err) console.error('Error closing MySQL pool:', err);
        else console.log('MySQL pool closed.');
        process.exit(0);
    });
});
let currentOrderId = 1000;
const idFilePath = path.join(__dirname, 'public', 'data', 'receipts', 'lastOrderId.txt');

// Load last used ID from file if it exists
if (fs.existsSync(idFilePath)) {
    currentOrderId = parseInt(fs.readFileSync(idFilePath, 'utf8'), 10);
}

// Generate unique order ID
function generateOrderId() {
    const orderId = `ORDER-${currentOrderId++}`;
    fs.writeFileSync(idFilePath, currentOrderId.toString());
    return orderId;
}

// Save order details and receipt
app.post('/saveOrder', (req, res) => {
    const orderData = req.body;

    // Validate order data
    if (!orderData.items || !orderData.total || !orderData.paymentMethod) {
        return res.status(400).json({ error: 'Invalid order data' });
    }

    // Generate unique order ID
    const orderId = generateOrderId();
    orderData.orderId = orderId;

    // Create receipt content
    const receiptContent = `
        Receipt for Order: ${orderId}
        Pub: ${orderData.pubName || 'N/A'}
        Address: ${orderData.address || 'N/A'}
        Date: ${orderData.date}
        Time: ${orderData.time}
        Server: ${orderData.serverName}

        Items:
        ${orderData.items.join('\n')}

        Total: €${orderData.total}
        Payment Method: ${orderData.paymentMethod}

        Thank you for your purchase!
    `;

    // Ensure receipts directory exists
    const receiptsDir = path.join(__dirname, 'public', 'data', 'receipts');
    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir);
    }

    // Save receipt to a text file
    const receiptPath = path.join(receiptsDir, `${orderId}.txt`);
    fs.writeFileSync(receiptPath, receiptContent);

    console.log(`Order saved successfully: ${orderId}`);
    res.json({ message: 'Order saved successfully', orderId: orderId });
});

// Redirect root URL to /index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fallback for unknown routes (optional, but useful for SPAs or 404 fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;