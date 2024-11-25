const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from public directory

// Serve the 'data' directory as static, so it can be accessed for file requests
app.use('/data', express.static(path.join(__dirname, '..', 'public', 'data')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// API: Add user
app.post('/data/users.json', (req, res) => {
    const userData = req.body;  // Assuming userData has { username, password }
    const usersFilePath = path.join(__dirname, '..', 'public', 'data', 'users.json'); // Correct path to users.json

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading users file' });
        }

        let users;
        try {
            users = JSON.parse(data); // Parse the existing users
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing users file' });
        }

        users.push(userData); // Add new user to the array

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving user data' });
            }
            res.status(201).json({ message: 'User added successfully' });
        });
    });
});

// API: Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // You may need to call your validateLogin function from userManager.js here
        await validateLogin(username, password);
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
app.use(cors());  // Enable CORS for all routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});