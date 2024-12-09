const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('./server'); // Import `app`
const sinon = require('sinon');
const { promisePool } = require('./server');
const crypto = require('crypto'); // Add the crypto import

chai.use(chaiHttp);
const { expect } = chai;

// Mock data
const user = {
    userFullName: 'Test User',
    userEmail: `testuser${Date.now()}@example.com`,
    userPassword: 'shortpassword',
};

describe('User CRUD API', function () {
    let connectionMock;

    before(async function () {
        connectionMock = sinon.stub(promisePool, 'execute'); // Mock the 'execute' method directly
        // The query method is not directly available on 'promisePool' as it's stubbed
    });

    after(async function () {
        sinon.restore(); // Restore promisePool to its original state
        try {
            await promisePool.execute('DELETE FROM users WHERE userEmail LIKE ?', ['testuser%@example.com']);
            console.log('Test users deleted successfully.');
        } catch (err) {
            console.error('Error during cleanup:', err.message);
        }
    });
    

    it('should add a user successfully', async function () {
        connectionMock.resolves([{ affectedRows: 1 }]); // Mock DB response

        const res = await chai
            .request(app)
            .post('/addUser')
            .send({ username: user.userFullName, email: user.userEmail, password: user.userPassword });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User added successfully.');
    });

    it('should fail to add a user if fields are missing', async function () {
        const res = await chai
            .request(app)
            .post('/addUser')
            .send({ username: user.userFullName, email: user.userEmail });

        expect(res).to.have.status(400);
        expect(res.text).to.equal('Username, email, and password are required.');
    });

    it('should login a user successfully with correct credentials', async function () {
        const salt = 'mockedSalt'; // Mocked salt value
        const hashedPassword = crypto
            .createHmac('sha256', salt)
            .update(user.userPassword)
            .digest('hex');
    
        connectionMock.resolves([[{ userEmail: user.userEmail, userPassword: hashedPassword, salt }]]);
    
        const res = await chai
            .request(app)
            .post('/getUser')
            .send({ email: user.userEmail, password: user.userPassword });
    
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Login successful.');
    });
     

    it('should return error if email or password is incorrect', async function () {
        const res = await chai
            .request(app)
            .post('/getUser')
            .send({ email: user.userEmail, password: 'wrongpassword' });

        expect(res).to.have.status(401);
        expect(res.text).to.equal('Invalid email or password.');
    });

    it('should update user details successfully', async function () {
        connectionMock.resolves([{ affectedRows: 1 }]);

        const updatedData = { userFullName: 'Updated User', userEmail: `updated${Date.now()}@example.com` };
        const res = await chai
            .request(app)
            .patch('/updateUser/1')
            .send(updatedData)

        expect(res).to.have.status(200);
        expect(res.text).to.equal('User updated successfully.');
    });

    it('should return error if no fields are provided for update', async function () {
        const res = await chai
            .request(app)
            .patch('/updateUser/1')
            .send({});

        expect(res).to.have.status(400);
        expect(res.text).to.equal('No fields provided for update.');

    });

    it('should search users by ID and full name', async function () {
        connectionMock.resolves([[{ userID: 1, userFullName: 'Test User', userEmail: 'testuser@example.com' }]]);

        const res = await chai
            .request(app)
            .post('/searchUser')
            .send({ userId: 1, fullName: 'Test' })

        expect(res).to.have.status(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].userFullName).to.equal('Test User');
    });

    it('should delete a user successfully', async function () {
        connectionMock.resolves([{ affectedRows: 1 }]); // Mock DB response

        const res = await chai
            .request(app)
            .delete('/deleteUser/1');  // Ensure route matches

        expect(res).to.have.status(200);
        expect(res.text).to.equal('User deleted successfully.');
    });

    it('should return error if user not found for deletion', async function () {
        connectionMock.resolves([{ affectedRows: 0 }]);

        const res = await chai
            .request(app)
            .delete('/deleteUser/999');

        expect(res).to.have.status(404);
        expect(res.text).to.equal('User not found.');
    });
});
