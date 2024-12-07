#!/bin/bash

echo "@@ Accessing the folder to run tests"

# Install Mocha if not already installed
if ! npm list mocha &> /dev/null; then
    echo "@@ Mocha is required."
    npm install --save-dev mocha
else
    echo "@@ Mocha is already installed."
fi

# Install Chai if not already installed
if ! npm list chai &> /dev/null; then
    echo "@@ Chai is required."
    npm install chai
else
    echo "@@ Chai is already installed."
fi

# Install Supertest if not already installed
if ! npm list supertest &> /dev/null; then
    echo "@@ Supertest is required."
    npm install --save-dev supertest
else
    echo "@@ Supertest is already installed."
fi

# Install Sinon if not already installed
if ! npm list sinon &> /dev/null; then
    echo "@@ Sinon is required."
    npm install --save-dev sinon
else
    echo "@@ Sinon is already installed."
fi

# Install ESM if not already installed
if ! npm list esm &> /dev/null; then
    echo "@@ ESM is required."
    npm install esm --save-dev
else
    echo "@@ ESM is already installed."
fi

# Running the User Test
echo "@@ Running the User Test.."
npx mocha user.test.js --require esm || { echo "@@ User test failed"; exit 1; }

echo "@@ .. @@" 

# Running the Integration Test
echo "@@ Running the Integration Test.."
npx mocha integration.test.js --require esm || { echo "@@ Integration test failed"; exit 1; }

echo "@@ .. @@" 