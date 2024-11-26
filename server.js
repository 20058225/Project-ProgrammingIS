const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Configuration
const pool = mysql.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL.');
        connection.release(); // Release the connection back to the pool
    }
});

const promisePool = pool.promise(); // Use promise-based queries

// Endpoint to Add a User
app.post('/addUser', async (req, res) => {
    const { userFullName, userEmail, userPassword } = req.body;
    if (!userFullName || !userEmail || !userPassword) {
        return res.status(400).send('Username, email, and password are required.');
    }
    try {
        const [result] = await promisePool.execute(
            'INSERT INTO users (userFullName, userEmail, userPassword) VALUES (?, ?, ?)',
            [userFullName, userEmail, userPassword]
        );
        res.status(200).send('User added successfully.');
        console.log('User added successfully.');
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).send('Error saving user to the database.');
    }
});

// Endpoint to Login with a User
app.post('/getUser', async (req, res) => {
    const { userFullName, userPassword } = req.body;
    if (!userFullName || !userPassword) {
        return res.status(400).send('Username and password are required.');
    }
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM users WHERE userFullName = ? AND userPassword = ?',
            [userFullName, userPassword]
        );

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login successful.', user: rows[0] });
            console.log('Login successful.');
        } else {
            res.status(401).send('Invalid username or password.');
            console.log('Invalid username or password.');
        }
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Error checking the user in the database.');
    }
});

// Endpoint to Update a User
app.put('/updateUser', async (req, res) => {
    const { userID, userFullName, userEmail, userPassword } = req.body;
    if (!userID || (!userFullName && !userEmail && !userPassword)) {
        return res.status(400).send('User ID and at least one field to update are required.');
    }
    try {
        const [result] = await promisePool.execute(
            `
            UPDATE users
            SET 
                userFullName = COALESCE(?, userFullName),
                userEmail = COALESCE(?, userEmail),
                userPassword = COALESCE(?, userPassword)
            WHERE userID = ?
            `,
            [userFullName || null, userEmail || null, userPassword || null, userID]
        );

        if (result.affectedRows > 0) {
            res.send('User updated successfully.');
            console.log('User updated successfully.');
        } else {
            res.status(404).send('User not found.');
            console.log('User not found.');
        }
    } catch (err) {
        console.error(err.message);
        console.log(err.message);
        res.status(500).send('Error updating user.');
    }
});

// Endpoint to Search a User
app.get('/searchUser', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM users WHERE userFullName LIKE ? OR userId = ?',
            [`%${searchTerm}%`, searchTerm]
        );
        res.json(rows);
    } catch (err) {
        console.error('Database error:', err);
        console.log('Database error:', err);
        res.status(500).send('Error searching users.');
    }
});

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

// Fallback to serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`, req.body);
    next();
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});