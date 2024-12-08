const sinon = require('sinon');
const request = require('supertest');
const app = require('./server');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

let expect;
(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();

// Mocking MySQL connection
const mockExecute = sinon.stub();
const testDbConnection = mysql.createPool({
    host: 'localhost',
    user: 'userTest',
    password: 'userTest1*',
    database: process.env.DATABASE_NAME || 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Setup for all tests
beforeEach(async () => {
    const connection = await testDbConnection.promise().getConnection();
    await connection.query('DELETE FROM users'); 
    await connection.query(`
        INSERT INTO users (userFullName, userEmail, userPassword)
        VALUES ('Test User', 'testuser@example.com', 'password123')
    `); // Example setup
    connection.release();
});

afterEach(async () => {
    const connection = await testDbConnection.promise().getConnection();
    await connection.query('DELETE FROM users'); 
    connection.release();
});

describe('User CRUD API', function () {
    it('should add a user successfully', async function () {
        const hashedPassword = await bcrypt.hash(user.userPassword, 10);
        mockExecute.resolves([{ insertId: 1 }]);

        const res = await request(app)
            .post('/addUser')
            .send({ username: user.userFullName, email: user.userEmail, password: user.userPassword })
            .expect(200);

        expect(res.text).to.include('User added successfully.');
    });

    it('should return error if required fields are missing while adding user', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({ username: user.userFullName, email: user.userEmail })
            .expect(400);

        expect(res.text).to.equal('Username, email, and password are required.');
    });

    it('should login a user successfully with correct credentials', async function () {
        const hashedPassword = await bcrypt.hash(user.userPassword, 10);
        mockExecute.resolves([[{ userEmail: user.userEmail, userPassword: hashedPassword }]]);

        const res = await request(app)
            .post('/getUser')
            .send({ email: user.userEmail, password: user.userPassword })
            .expect(200);

        expect(res.body.message).to.equal('Login successful.');
    });

    it('should return error if email or password is incorrect', async function () {
        const res = await request(app)
            .post('/getUser')
            .send({ email: user.userEmail, password: 'wrongpassword' })
            .expect(401);

        expect(res.text).to.equal('Invalid email or password.');
    });

    it('should update user details successfully', async function () {
        mockExecute.resolves([{ affectedRows: 1 }]);

        const updatedData = { userFullName: 'Updated User', userEmail: 'updated@example.com' };
        const res = await request(app)
            .patch('/updateUser/1')
            .send(updatedData)
            .expect(200);

        expect(res.text).to.equal('User updated successfully.');
    });

    it('should return error if no fields are provided for update', async function () {
        const res = await request(app)
            .patch('/updateUser/1')
            .send({})
            .expect(400);

        expect(res.text).to.equal('No fields provided for update.');
    });

    it('should search users by ID and full name', async function () {
        mockExecute.resolves([[{ userID: 1, userFullName: 'Test User', userEmail: 'testuser@example.com' }]]);

        const res = await request(app)
            .post('/searchUser')
            .send({ userId: 1, fullName: 'Test' })
            .expect(200);

        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].userFullName).to.equal('Test User');
    });

    it('should delete a user successfully', async function () {
        mockExecute.resolves([{ affectedRows: 1 }]);

        const res = await request(app)
            .delete('/deleteUser/1')
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
    });

    it('should return error if user not found for deletion', async function () {
        mockExecute.resolves([{ affectedRows: 0 }]);

        const res = await request(app)
            .delete('/deleteUser/999')
            .expect(404);

        expect(res.text).to.equal('User not found.');
    });
});