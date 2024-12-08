import { app } from './app.js'; // Import the app from app.js
import sinon from 'sinon';
import * as mysql from 'mysql2/promise';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js'; // Ensure the correct path to your app module

describe('User CRUD API', function () {
    let connectionMock;

    before(async function () {
        // Mock the MySQL connection and query behavior
        connectionMock = sinon.stub(mysql, 'createConnection').resolves({
            query: sinon.stub().callsFake(async (sql) => {
                if (sql.includes('INSERT INTO users')) {
                    return [{ insertId: 1 }];
                } else if (sql.includes('SELECT * FROM users')) {
                    return [[{ userID: 1, userFullName: 'Test User', userEmail: 'testuser@example.com' }]];
                } else if (sql.includes('UPDATE users')) {
                    return [{ affectedRows: 1 }];
                } else if (sql.includes('DELETE FROM users')) {
                    return [{ affectedRows: 1 }];
                }
                return [[]];
            }),
            end: sinon.stub().resolves(),
        });
    });

    after(function () {
        sinon.restore();
    });

    it('should add a user successfully', async function () {
        const res = await request(app)
            .post('/addUser')
            .send({ username: 'Test User', email: 'testuser@example.com', password: 'password123' })
            .expect(200);

        expect(res.text).to.include('User added successfully.');
    });

    it('should delete a user successfully', async function () {
        const res = await request(app)
            .delete('/deleteUser/1')
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
    });
});