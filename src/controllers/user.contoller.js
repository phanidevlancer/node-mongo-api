const User = require('../models/user.Model');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        console.log('users data is ', users)
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        // Remove password from response
        user.password = undefined;

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Email already exists'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }

        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};