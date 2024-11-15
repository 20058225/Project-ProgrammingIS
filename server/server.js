const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the "public" and "scripts" folders
app.use(express.static(path.join(__dirname, '..')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    // Dynamically import `open` and open the browser
    try {
        const { default: open } = await import('open');
        open(`http://localhost:${PORT}/index.html`);
    } catch (error) {
        console.error("Failed to open the browser:", error);
    }
});