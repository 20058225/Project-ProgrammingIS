const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'data', 'users.json');

// Helper: Read users
async function readUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error("User file not found. Initializing empty user list.");
            return [];
        }
        throw error;
    }
}

// Helper: Write users
async function writeUsers(users) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
}

// Add user
async function addUser(username, password) {
    const users = await readUsers();
    if (users.some(user => user.username === username)) {
        throw new Error(`User "${username}" already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    await writeUsers(users);
}

// Validate login
async function validateLogin(username, password) {
    const users = await readUsers();
    const user = users.find(user => user.username === username);
    if (!user) throw new Error("Invalid username or password.");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid username or password.");
}

// Export functions
module.exports = { addUser, validateLogin };
