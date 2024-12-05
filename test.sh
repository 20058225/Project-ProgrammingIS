echo "@@ Accessing the folder to run tests"
cd test

# Install Mocha, Chai, and Supertest if not already installed
if ! command -v mocha chai supertest &> /dev/null; then
    echo "@@ Mocha, Chai, Supertest are required."
    npm install --save-dev mocha chai supertest
else
    echo "@@ Mocha, Chai, Supertest are already installed."
fi

echo "@@ Running the User Test.."
npx mocha user.test.js

echo "@@ .. @@" 

echo "@@ Running the Integration Test.."
npx mocha integration.test.js

echo "@@ .. @@"