echo "@@ Accessing the folder to run tests"

# Install Mocha, Chai, and Supertest if not already installed
if ! command -v mocha &> /dev/null; then
    echo "@@ Mocha is required."
    #npm install --save-dev mocha
    npm install chai@^4.3.7

else
    echo "@@ Mocha is already installed."
fi

if ! command -v chai &> /dev/null; then
    echo "@@ Chai is required."
    npm install chai
else
    echo "@@ Chai is already installed."
fi

if ! command -v supertest &> /dev/null; then
    echo "@@ Supertest is required."
    npm install --save-dev supertest
else
    echo "@@ Supertest is already installed."
fi

if ! command -v sinon &> /dev/null; then
    echo "@@ Sinon is required."
    npm install --save-dev sinon
else
    echo "@@ Sinon is already installed."
fi

if ! command -v esm &> /dev/null; then
    echo "@@ Esm is required."
    npm install esm --save-dev
else
    echo "@@ Esm is already installed."
fi

echo "@@ Running the User Test.."
npx mocha user.test.js --require esm

echo "@@ .. @@" 

echo "@@ Running the Integration Test.."
#npx mocha integration.test.js

echo "@@ .. @@"