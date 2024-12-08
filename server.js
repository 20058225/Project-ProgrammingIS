const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'pubpal',
});

// Add a new user
app.post('/addUser', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const [result] = await pool.query('INSERT INTO users (userFullName, userEmail, userPassword) VALUES (?, ?, ?)', [username, email, password]);
        res.send('User added successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding user.');
    }
});

// Delete a user
app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const [result] = await pool.query('DELETE FROM users WHERE userID = ?', [userId]);
        if (result.affectedRows > 0) {
            res.send('User deleted successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user.');
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;