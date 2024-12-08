#!/bin/bash

# Set PORT environment variable
export PORT=4000

# Function to check and install npm packages
install_package() {
    if ! npm list "$1" --depth=0 &> /dev/null; then
        echo "@@ $1 is required."
        npm install "$1"
    else
        echo "@@ $1 is already installed."
    fi
}

# Check and install required npm packages
install_package mocha
install_package chai
install_package chai-http
install_package sinon

# Running the User Test
echo "@@ Running the User Test..."
npx mocha user.test.js --timeout 10000 --reporter spec || { echo "@@ User test failed"; exit 1; }