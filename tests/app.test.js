const request = require('supertest');
const app = require('../src/app');
const dbHandler = require('./db-handler');

// Connect to a test database before running any tests
beforeAll(async () => await dbHandler.connect());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('App Basic Routes', () => {
    // Test root route
    describe('GET /', () => {
        it('should return welcome message', async () => {
            const res = await request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('Welcome to Node.js MongoDB API');
        });
    });

    // Test 404 handler
    describe('404 Handler', () => {
        it('should return 404 for nonexistent routes', async () => {
            const res = await request(app)
                .get('/nonexistent-route')
                .expect('Content-Type', /json/)
                .expect(404);

            expect(res.body).toHaveProperty('error');
            expect(res.body.error).toBe('Page not found');
        });
    });
});