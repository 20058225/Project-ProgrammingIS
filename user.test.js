const sinon = require('sinon');
const request = require('supertest');
const app = require('./server');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Import Chai's expect
let expect;
(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();

// Mock mysql2 module
const mockMySQL = {
    query: sinon.stub(),
    execute: sinon.stub(),
    promise: () => ({
        query: mockMySQL.query,
        execute: mockMySQL.execute,
    }),
};

// Replace mysql2 createPool with mock
sinon.stub(mysql, 'createPool').returns(mockMySQL);

// Set up mock responses
beforeEach(() => {
    mockMySQL.query.reset();
    mockMySQL.execute.reset();

    // Set default behavior for mock queries
    mockMySQL.query.callsFake((sql, params, callback) => {
        if (sql.includes('INSERT INTO users')) {
            callback(null, { insertId: 1 });
        } else if (sql.includes('DELETE FROM users')) {
            callback(null, { affectedRows: 1 });
        } else if (sql.includes('SELECT')) {
            callback(null, [
                {
                    userID: 1,
                    userFullName: 'Test User',
                    userEmail: 'testuser@example.com',
                    userPassword: bcrypt.hashSync('password123', 10),
                },
            ]);
        } else {
            callback(null, []);
        }
    });
});

afterEach(() => {
    sinon.restore();
});

describe('User CRUD API', function () {
    it('should add a user successfully', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({
                username: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
            })
            .expect(200);

        expect(res.text).to.include('User added successfully.');
        expect(mockMySQL.query.calledOnce).to.be.true;
    });

    it('should return error if required fields are missing while adding user', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({ username: 'Test User', email: 'testuser@example.com' })
            .expect(400);

        expect(res.text).to.equal('Username, email, and password are required.');
        expect(mockMySQL.query.called).to.be.false;
    });

    it('should login a user successfully with correct credentials', async function () {
        const res = await request(app)
            .post('/getUser')
            .send({ email: 'testuser@example.com', password: 'password123' })
            .expect(200);

        expect(res.body.message).to.equal('Login successful.');
        expect(mockMySQL.query.calledOnce).to.be.true;
    });

    it('should return error if email or password is incorrect', async function () {
        const res = await request(app)
            .post('/getUser')
            .send({ email: 'testuser@example.com', password: 'wrongpassword' })
            .expect(401);

        expect(res.text).to.equal('Invalid email or password.');
        expect(mockMySQL.query.calledOnce).to.be.true;
    });

    it('should update user details successfully', async function () {
        mockMySQL.query.callsFake((sql, params, callback) => {
            if (sql.includes('UPDATE users')) {
                callback(null, { affectedRows: 1 });
            }
        });

        const res = await request(app)
            .patch('/updateUser/1')
            .send({
                userFullName: 'Updated User',
                userEmail: 'updated@example.com',
            })
            .expect(200);

        expect(res.text).to.equal('User updated successfully.');
        expect(mockMySQL.query.calledOnce).to.be.true;
    });

    it('should delete a user successfully', async function () {
        const res = await request(app)
            .delete('/deleteUser/1')
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
        expect(mockMySQL.query.calledOnce).to.be.true;
    });
});