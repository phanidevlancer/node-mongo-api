const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct
} = require('../controllers/product.controller');

// GET all products and POST new product
router.route('/')
    .get(getProducts)
    .post(createProduct);

// GET single product
router.route('/:id')
    .get(getProduct);

module.exports = router;