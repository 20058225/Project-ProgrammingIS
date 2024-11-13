const fs = require('fs');
const path = './users.json';

// Helper function to read users from JSON file
function readUsers() {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
}

// Helper function to write users to JSON file
function writeUsers(users) {
    try {
        fs.writeFileSync(path, JSON.stringify(users, null, 2), 'utf8');
        console.log("Users saved successfully.");
    } catch (error) {
        console.error("Error writing users file:", error);
    }
}

// Function to add a user
function addUser(username, password) {
    let users = readUsers();
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        console.error("User already exists!");
        return false;
    }
    users.push({ username, password });
    writeUsers(users);
    console.log(`User ${username} added successfully.`);
    return true;
}

// Function to edit a user
function editUser(username, newUsername, newPassword) {
    let users = readUsers();
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
        console.error("User not found.");
        return false;
    }
    users[userIndex].username = newUsername || users[userIndex].username;
    users[userIndex].password = newPassword || users[userIndex].password;
    writeUsers(users);
    console.log(`User ${username} updated successfully.`);
    return true;
}

// Function to delete a user
function deleteUser(username) {
    let users = readUsers();
    const filteredUsers = users.filter(user => user.username !== username);
    if (filteredUsers.length === users.length) {
        console.error("User not found.");
        return false;
    }
    writeUsers(filteredUsers);
    console.log(`User ${username} deleted successfully.`);
    return true;
}

// Function to validate login
function validateLogin(username, password) {
    const users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log("Login successful.");
        return true;
    }
    console.error("Invalid username or password.");
    return false;
}

// Exporting functions for use in other files
module.exports = { addUser, editUser, deleteUser, validateLogin };
