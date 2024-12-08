#!/bin/bash

# Set PORT environment variable
export PORT=4000

# List of packages to install
DEV_PACKAGES=(mocha chai supertest sinon)
DEP_PACKAGES=(express body-parser express-validator cors dotenv bcryptjs mysql2 nodemon eslint)

# Function to check and install packages
install_packages() {
    local packages=("$@")
    for package in "${packages[@]}"; do
        if ! npm list "$package" --depth=0 &> /dev/null; then
            echo "@@ Installing $package..."
            npm install --save-dev "$package"
        else
            echo "@@ $package is already installed."
        fi
    done
}

# Install devDependencies and dependencies
echo "@@ Checking and installing devDependencies..."
install_packages "${DEV_PACKAGES[@]}"
echo "@@ Checking and installing dependencies..."
install_packages "${DEP_PACKAGES[@]}"

# Run tests
echo "@@ Running the User Test..."
if npx mocha user.test.js; then
    echo "@@ All tests passed successfully!"
else
    echo "@@ User test failed. Check the error logs above."
    exit 1
fi