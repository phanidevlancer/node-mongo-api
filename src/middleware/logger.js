// src/middleware/logger.js
const logger = (req, res, next) => {
    console.log(`Middleware logger : ${new Date().toISOString()} | ${req.method} ${req.originalUrl}`);

    // Call next() to pass control to the next middleware function
    next();
};

module.exports = logger;