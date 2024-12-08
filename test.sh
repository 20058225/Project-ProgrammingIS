#!/bin/bash

# Set PORT environment variable
export PORT=4000

# Install Mocha if not already installed
if ! npm list mocha --depth=0 &> /dev/null; then
    echo "@@ Mocha is required."
    npm install --save-dev mocha
else
    echo "@@ Mocha is already installed."
fi

# Install Chai if not already installed
if ! npm list chai --depth=0 &> /dev/null; then
    echo "@@ Chai is required."
    npm install chai
else
    echo "@@ Chai is already installed."
fi

# Install Supertest if not already installed
if ! npm list supertest --depth=0 &> /dev/null; then
    echo "@@ Supertest is required."
    npm install --save-dev supertest
else
    echo "@@ Supertest is already installed."
fi

# Install Sinon if not already installed
if ! npm list sinon --depth=0 &> /dev/null; then
    echo "@@ Sinon is required."
    npm install --save-dev sinon
else
    echo "@@ Sinon is already installed."
fi

# Install ESM if not already installed
if ! npm list esm --depth=0 &> /dev/null; then
    echo "@@ ESM is required."
    npm install esm --save-dev
else
    echo "@@ ESM is already installed."
fi

# Install missing packages if not found
install_package() {
    if ! npm list "$1" --depth=0 &> /dev/null; then
        echo "@@ $1 is required."
        npm install "$1"
    else
        echo "@@ $1 is already installed."
    fi
}

install_package express
install_package body-parser
install_package express-validator
install_package cors
install_package dotenv
install_package nodemon
install_package eslint
npm install bcryptjs
npm install --save mysql2

# Running the User Test
echo "@@ Running the User Test..."
npx mocha user.test.js || { echo "@@ User test failed"; exit 1; }