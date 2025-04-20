const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price must be positive']
    },
    category: {
        type: String,
        required: [true, 'Please provide a product category'],
        enum: ['electronics', 'clothing', 'food', 'books', 'other']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);