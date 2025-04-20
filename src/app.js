const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const logger = require('./middleware/logger');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(logger);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Node.js MongoDB API' });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

module.exports = app;