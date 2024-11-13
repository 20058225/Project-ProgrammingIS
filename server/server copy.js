const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

const filePath = path.join(__dirname, 'user.json');

// Get all users
app.get('/users', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading users');
        res.send(JSON.parse(data));
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading users');

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing user');
            res.send('User added successfully');
        });
    });
});

// Update an existing user
app.put('/users/:username', (req, res) => {
    const username = req.params.username;
    const updatedData = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading users');

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex === -1) return res.status(404).send('User not found');

        users[userIndex] = { ...users[userIndex], ...updatedData };

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error updating user');
            res.send('User updated successfully');
        });
    });
});

// Delete a user
app.delete('/users/:username', (req, res) => {
    const username = req.params.username;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading users');

        let users = JSON.parse(data);
        users = users.filter(user => user.username !== username);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error deleting user');
            res.send('User deleted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});