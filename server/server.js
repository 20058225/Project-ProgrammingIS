const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/data', express.static(path.join(__dirname, '..', 'public', 'data')));
app.use(cors());

const usersFilePath = path.join(__dirname, '..', 'public', 'data', 'users.json');

// Helper function to read users
async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write users
async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

// Add user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await readUsers();
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    users.push({ name, email, password });
    await writeUsers(users);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
});

// Edit user
app.put('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, newEmail, password } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    users[userIndex] = { name: name || users[userIndex].name, email: newEmail || email, password: password || users[userIndex].password };
    await writeUsers(users);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
app.delete('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const users = await readUsers();
    const filteredUsers = users.filter(user => user.email !== email);
    if (filteredUsers.length === users.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    await writeUsers(filteredUsers);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});