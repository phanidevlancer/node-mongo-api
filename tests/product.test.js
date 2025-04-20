const request = require('supertest');
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const app = require('../src/app');
const Product = require('../src/models/product.Model');
const User = require('../src/models/user.Model');

// Connect to a test database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('Product API', () => {
    let userId;

    // Setup a user for product creation
    beforeEach(async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'user'
        });
        userId = user._id;
    });

    // Test sample product data
    const sampleProduct = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'electronics',
        inStock: true
    };

    // Test creating a new product
    describe('POST /api/products', () => {
        it('should create a new product', async () => {
            const productData = {
                ...sampleProduct,
                createdBy: userId
            };

            const res = await request(app)
                .post('/api/products')
                .send(productData)
                .expect('Content-Type', /json/)
                .expect(201);

            // Check the response structure
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data.name).toBe(sampleProduct.name);
            expect(res.body.data.price).toBe(sampleProduct.price);
            expect(res.body.data.createdBy.toString()).toBe(userId.toString());
        });

        it('should not create a product without required fields', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'Incomplete Product',
                    // Missing other required fields
                    createdBy: userId
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(res.body.success).toBe(false);
        });

        it('should not create a product with invalid category', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    ...sampleProduct,
                    category: 'invalid-category', // Not in enum
                    createdBy: userId
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(res.body.success).toBe(false);
        });
    });

    // Test getting all products
    describe('GET /api/products', () => {
        it('should get all products', async () => {
            // Create a few products first
            await Product.create({
                ...sampleProduct,
                createdBy: userId
            });

            await Product.create({
                ...sampleProduct,
                name: 'Another Product',
                price: 199.99,
                createdBy: userId
            });

            const res = await request(app)
                .get('/api/products')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.success).toBe(true);
            expect(res.body.count).toBe(2);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data).toHaveLength(2);
        });
    });

    // Test getting a single product
    describe('GET /api/products/:id', () => {
        it('should get a single product by ID', async () => {
            // Create a product first
            const product = await Product.create({
                ...sampleProduct,
                createdBy: userId
            });

            const res = await request(app)
                .get(`/api/products/${product._id}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data._id).toBe(product._id.toString());
            expect(res.body.data.name).toBe(product.name);
            expect(res.body.data.price).toBe(product.price);
        });

        it('should return 404 for non-existent product ID', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();

            const res = await request(app)
                .get(`/api/products/${nonExistentId}`)
                .expect('Content-Type', /json/)
                .expect(404);

            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe('Product not found');
        });

        it('should return 400 for invalid product ID format', async () => {
            const res = await request(app)
                .get('/api/products/invalidid')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe('Invalid product ID');
        });
    });
});