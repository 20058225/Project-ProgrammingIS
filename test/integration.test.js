(async () => {
  // Dynamically import required modules
  const { expect } = await import('chai');
  const http = require('http');
  const mysql = require('mysql2'); // Required for DB interaction
  const server = require('../server'); // Assuming your server.js is in the parent directory
  const dotenv = require('dotenv');

  dotenv.config(); // Load environment variables

  // Create a connection to the database
  const dbConnection = mysql.createConnection({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
 

  // Check DB connection
  before((done) => {
    dbConnection.connect((err) => {
      if (err) {
        console.error('Database connection failed:', err.stack);
        done(err);
        console.error('Error connecting to MySQL:', err.stack);
      } else {
        console.log('Connected to the database.');
        done();
        console.log('Connected to MySQL database');
      }
      dbConnection.end();
    });
  });

  // Create an HTTP request to the server
  let request;
  before(() => {
    request = http.request({
      hostname: 'localhost',
      port: PORT,
      path: '/updateUser/19', // Example route for updating user
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  describe('User API Integration Tests', () => {

    it('should update the user information', (done) => {
      const updatedData = { name: 'Jane Doe', email: 'jane@example.com' };

      request.write(JSON.stringify(updatedData));
      request.end();

      request.on('response', (response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should delete the user', (done) => {
      const deleteRequest = http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/deleteUser/19', // Example route to delete user by ID
        method: 'DELETE'
      }, (response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });

      deleteRequest.end();
    });

    it('should confirm user existence after creation', (done) => {
      const getUserRequest = http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/getUser/19', // Example route to get user by ID
        method: 'GET'
      }, (response) => {
        expect(response.statusCode).to.equal(200);
        let data = '';
        
        response.on('data', chunk => {
          data += chunk;
        });
        
        response.on('end', () => {
          const user = JSON.parse(data);
          expect(user).to.have.property('name').that.equals('Jane Doe');
          done();
        });
      });

      getUserRequest.end();
    });

  });

  // Close DB connection and server after tests
  after((done) => {
    dbConnection.end((err) => {
      if (err) {
        console.error('Error closing DB connection:', err.stack);
      } else {
        console.log('DB connection closed.');
      }
    });
    server.close(() => {
      console.log('Server closed.');
      done();
    });
  });

})();
