(async () => {
    const { expect } = await import('chai');
    const http = require('http'); // Example of another module, like http for your tests
    const server = require('../server'); // Assuming your server.js is in the parent directory
  
    describe('User API Tests', () => {
  
      let request;
  
      before(() => {
        // You can initialize your request object here if needed
        request = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/addUser', // Example route
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      });
  
      it('should create a new user', (done) => {
        const userData = { name: 'John Doe', email: 'john@example.com' };
        
        request.write(JSON.stringify(userData));
        
        request.end();
        
        // Check the response
        request.on('response', (response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
  
      it('should retrieve the user', (done) => {
        const getRequest = http.request({
          hostname: 'localhost',
          port: 3000,
          path: '/getUser/1', // Example route to get user by ID
          method: 'GET'
        }, (response) => {
          expect(response.statusCode).to.equal(200);
          let data = '';
          
          response.on('data', chunk => {
            data += chunk;
          });
          
          response.on('end', () => {
            expect(JSON.parse(data).name).to.equal('John Doe');
            done();
          });
        });
  
        getRequest.end();
      });
  
      after(() => {
        server.close(); // Close the server after tests
      });
  
    });
  
})();  