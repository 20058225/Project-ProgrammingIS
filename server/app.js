const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'user.json');

// Get all users
function getUsers(req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading users');
        res.send(JSON.parse(data));
    });
}

// Add a new user
function addUser(req, res) {
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
}

// Update an existing user
function updateUser(req, res) {
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
}

// Delete a user
function deleteUser(req, res) {
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
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};