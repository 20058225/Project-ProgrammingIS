#!/bin/bash

# Set PORT environment variable
export PORT=4000
npm install bcryptjs

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
install_package sinon
install_package supertest
install_package esm
install_package mysql2
install_package express
install_package body-parser
install_package cors
install_package dotenv
install_package express-validator
install_package nodemon

# Running the User Test
echo "@@ Running the User Test..."
npx mocha user.test.js --require esm || { echo "@@ User test failed"; exit 1; }