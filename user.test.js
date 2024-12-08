const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mysql = require('mysql2');
const server = require('./server');
const { promisePool } = require('./server');

chai.use(chaiHttp);

const expect = chai.expect;

describe('User CRUD API', function () {
    let connectionMock;

    before(async function () {
        connectionMock  = sinon.stub(promisePool, 'execute');
    });

    after(async function () {
        sinon.restore();
    });

    it('should add a user successfully', async function () {
        const res = await chai
            .request(server)
            .post('/addUser')  
            .send({ username: 'Test User', email: 'testuser@example.com', password: 'password123' })
            .expect(200);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'User added successfully.');
    });
    
    it('should fail to add a user if fields are missing', async function () {
        const res = await chai
        .request(server)
        .post('/addUser')
        .send({ username: 'Test User', email: 'testuser@example.com' })

        expect(res).to.have.status(400);
        expect(res.text).to.equal('Username, email, and password are required.');
    });

    it('should delete a user successfully', async function () {
        const res = await chai
            .request(server)
            .delete('/deleteUser/1')  // Ensure route matches
            .expect(200);

        expect(res.text).to.equal('User deleted successfully.');
    });
});
