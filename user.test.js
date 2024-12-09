const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./server'); // Import `app`
const sinon = require('sinon');
const { promisePool } = require('./server');

chai.use(chaiHttp);
const { expect } = chai;

// Mock data
const user = {
    userFullName: 'Test User',
    userEmail: 'testuser@example.com',
    userPassword: 'shortpassword',
};

describe('User CRUD API', function () {
    let connectionMock;

    before(async function () {
        connectionMock  = sinon.stub(promisePool, 'execute');
    });

    after(async function () {
        sinon.restore();
    });

    it('should add a user successfully', async function () {
        connectionMock.resolves([{ affectedRows: 1 }]); // Mock DB response

        const res = await chai
            .request(app)
            .post('/addUser')  
            .send({ username: user.userFullName, email: user.userEmail, password: user.userPassword })
            
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User added successfully.');
    });
    
    it('should fail to add a user if fields are missing', async function () {
        const res = await chai
            .request(app)
            .post('/addUser')
            .send({ username: user.userFullName, email: user.userEmail })

        expect(res).to.have.status(400);
        expect(res.text).to.equal('Username, email, and password are required.');
    });

    it('should delete a user successfully', async function () {
        connectionMock.resolves([{ affectedRows: 1 }]); // Mock DB response

        const res = await chai
            .request(app)
            .delete('/deleteUser/1')  // Ensure route matches

        expect(res).to.have.status(200);
        expect(res.text).to.equal('User deleted successfully.');
    });
});
