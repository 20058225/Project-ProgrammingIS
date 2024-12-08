import { app } from '../app.js'; // Use only this import
import sinon from 'sinon';
import * as mysql from 'mysql2/promise';
import { expect } from 'chai';
import request from 'supertest';

describe('User CRUD API', function () {
    let mockDB;
    before(async function () {
        mockDB = sinon.stub(mysql, 'createPool').returns({
            query: sinon.stub().resolves(),
        });
    });

    after(async function () {
        sinon.restore(); // Restore stubs
    });

    it('should add a user successfully', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({ username: 'Test User', email: 'test@example.com', password: 'password123' })
            .expect(200);

        expect(res.text).to.include('User added successfully.');
    });

    it('should return error if required fields are missing', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({ username: 'Test User', email: 'test@example.com' }) // Missing password
            .expect(400);

        expect(res.text).to.equal('Username, email, and password are required.');
    });

    it('should login successfully with correct credentials', async function () {
        const res = await request(app)
            .post('/getUser')
            .send({ email: 'testuser@example.com', password: 'password123' })
            .expect(200);

        expect(res.body.message).to.equal('Login successful.');
    });

    it('should return error if email or password is incorrect', async function () {
        const res = await request(app)
            .post('/getUser')
            .send({ email: 'wrong@example.com', password: 'wrongpassword' })
            .expect(401);

        expect(res.text).to.equal('Invalid email or password.');
    });

    it('should update user details successfully', async function () {
        const res = await request(app)
            .patch('/updateUser/1')
            .send({ userFullName: 'Updated User' })
            .expect(200);

        expect(res.text).to.equal('User updated successfully.');
    });

    it('should delete a user successfully', async function () {
        const res = await request(app)
            .delete('/deleteUser/1')
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
    });

    it('should return error if user not found for deletion', async function () {
        const res = await request(app)
            .delete('/deleteUser/999')
            .expect(404);

        expect(res.text).to.equal('User not found.');
    });
});