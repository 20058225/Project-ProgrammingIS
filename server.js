import { app } from './app.js'; // Import the app from app.js
import dotenv from 'dotenv';

dotenv.config(); 

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
