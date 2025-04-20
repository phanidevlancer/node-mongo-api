require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/database');

// Database connection
connectDatabase();

// Server Configuration
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});