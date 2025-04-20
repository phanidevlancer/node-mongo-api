const request = require('supertest');
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const app = require('../src/app');
const User = require('../src/models/user.Model');

// Connect to a test database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

describe('User API', () => {
  // Test sample user data
  const sampleUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user'
  };

  // Test creating a new user
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send(sampleUser)
        .expect('Content-Type', /json/)
        .expect(201);

      // Check the response structure
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe(sampleUser.name);
      expect(res.body.data.email).toBe(sampleUser.email);
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('should not create a user with duplicate email', async () => {
      // First create a user
      await User.create(sampleUser);

      // Try to create another user with the same email
      const res = await request(app)
        .post('/api/users')
        .send(sampleUser)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Email already exists');
    });

    it('should not create a user without required fields', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          name: 'Incomplete User'
          // Missing email and password
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  // Test getting all users
  describe('GET /api/users', () => {
    it('should get all users', async () => {
      // Create a few users first
      await User.create(sampleUser);
      await User.create({
        ...sampleUser,
        name: 'Another User',
        email: 'another@example.com'
      });

      const res = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0]).not.toHaveProperty('password');
    });
  });

  // Test getting a single user
  describe('GET /api/users/:id', () => {
    it('should get a single user by ID', async () => {
      // Create a user first
      const user = await User.create(sampleUser);

      const res = await request(app)
        .get(`/api/users/${user._id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data._id).toBe(user._id.toString());
      expect(res.body.data.name).toBe(user.name);
      expect(res.body.data.email).toBe(user.email);
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('should return 404 for non-existent user ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .get(`/api/users/${nonExistentId}`)
        .expect('Content-Type', /json/)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('User not found');
    });

    it('should return 400 for invalid user ID format', async () => {
      const res = await request(app)
        .get('/api/users/invalidid')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Invalid user ID');
    });
  });
});