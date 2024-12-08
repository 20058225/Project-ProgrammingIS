const sinon = require('sinon');
const mysql = require('mysql2/promise');
const { expect } = require('chai');
const request = require('supertest');
const app = require('./server'); // Ensure the correct path to your server.js file

describe('User CRUD API', function () {
    let connectionMock;

    before(async function () {
        // Mock the MySQL connection and query behavior
        sinon.stub(mysql, 'createConnection').resolves({
            query: sinon.stub().callsFake(async (sql, params) => {
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
        // Restore the original mysql.createConnection method
        sinon.restore();
    });

    it('should add a user successfully', async function () {
        const res = await request(app)
            .post('/addUser')  // Ensure route matches
            .send({ userFullName: 'Test User', userEmail: 'testuser@example.com', userPassword: 'password123' }) // Ensure body matches route
            .expect(200);

        expect(res.text).to.include('User added successfully.');
    });

    it('should delete a user successfully', async function () {
        const res = await request(app)
            .delete('/deleteUser/1')  // Ensure route matches
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
    });
});
