/**
 * Custom error response handler
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Error message
 * @param {Object|Array|null} data - Optional data to include in the response
 */
const errorResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: false,
        error: message
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

module.exports = {
    errorResponse
};