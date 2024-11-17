const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'scripts', 'users.json');

// Helper function to read users from JSON file
async function readUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("User file not found. Initializing empty user list.");
            return [];
        }
        console.error("Error reading users file:", error.message);
        throw error;
    }
}

// Helper function to write users to JSON file
async function writeUsers(users) {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
        console.log("Users saved successfully.");
    } catch (error) {
        console.error("Error writing users file:", error.message);
        throw error;
    }
}

// Input validation helper
function validateInput(input, type) {
    if (!input || typeof input !== type) {
        throw new Error(`Invalid input: expected ${type}, got ${typeof input}`);
    }
}

// Function to add a user
async function addUser(username, password) {
    try {
        validateInput(username, 'string');
        validateInput(password, 'string');

        const users = await readUsers();
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            console.error(`User "${username}" already exists!`);
            return false;
        }

        users.push({ username, password });
        await writeUsers(users);
        console.log(`User "${username}" added successfully.`);
        return true;
    } catch (error) {
        console.error("Error adding user:", error.message);
        return false;
    }
}

// Function to edit a user
async function editUser(username, newUsername, newPassword) {
    try {
        validateInput(username, 'string');
        if (newUsername) validateInput(newUsername, 'string');
        if (newPassword) validateInput(newPassword, 'string');

        const users = await readUsers();
        const userIndex = users.findIndex(user => user.username === username);
        if (userIndex === -1) {
            console.error(`User "${username}" not found.`);
            return false;
        }

        if (newUsername) users[userIndex].username = newUsername;
        if (newPassword) users[userIndex].password = newPassword;

        await writeUsers(users);
        console.log(`User "${username}" updated successfully.`);
        return true;
    } catch (error) {
        console.error("Error editing user:", error.message);
        return false;
    }
}

// Function to delete a user
async function deleteUser(username) {
    try {
        validateInput(username, 'string');

        const users = await readUsers();
        const filteredUsers = users.filter(user => user.username !== username);
        if (filteredUsers.length === users.length) {
            console.error(`User "${username}" not found.`);
            return false;
        }

        await writeUsers(filteredUsers);
        console.log(`User "${username}" deleted successfully.`);
        return true;
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return false;
    }
}

// Function to validate login
async function validateLogin(username, password) {
    try {
        validateInput(username, 'string');
        validateInput(password, 'string');

        const users = await readUsers();
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            console.log("Login successful.");
            return true;
        } else {
            console.error("Invalid username or password.");
            return false;
        }
    } catch (error) {
        console.error("Error validating login:", error.message);
        return false;
    }
}

// Exporting functions for use in other files
module.exports = { addUser, editUser, deleteUser, validateLogin };
