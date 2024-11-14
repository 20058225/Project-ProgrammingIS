const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const api = require('./app');  // Import the API functions from app.js

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (like index.html) from the "public" folder
app.use(express.static('public'));

// API routes
app.get('/users', api.getUsers);           // Get all users
app.post('/users', api.addUser);            // Add a new user
app.put('/users/:username', api.updateUser); // Update an existing user
app.delete('/users/:username', api.deleteUser); // Delete a user

// Add a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
// Start the server

app.listen(PORT, '0.0.0.0', function() {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});