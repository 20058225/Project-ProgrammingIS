const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { addUser, validateLogin } = require('./userManager');
const path = require('path'); // Add this line to import the path module

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serves static files from the public directory


// Serve the 'data' directory as static
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// API: Add user
app.post(
    '/api/users',
    [
        check('username').isString().isLength({ min: 3 }),
        check('password').isString().isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, password } = req.body;
            await addUser(username, password);
            res.status(201).json({ message: 'User added successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// API: Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        await validateLogin(username, password);
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

