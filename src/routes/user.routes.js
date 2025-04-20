const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser
} = require('../controllers/user.contoller');
const logger = require('../middleware/logger');

// GET all users and POST new user
router.get('/', logger, getUsers)
router.post('/', createUser);

// GET single user
router.route('/:id')
    .get(getUser);

module.exports = router;