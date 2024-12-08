#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "@@ Node.js is required."
    sudo apt install -y nodejs
else
    echo "@@ Node.js is already installed."
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "@@ NPM is required."
    sudo apt install -y npm
else
    echo "@@ NPM is already installed."
fi

# Initialize npm project if package.json does not exist
if [ ! -f package.json ]; then
    echo "@@ Initializing npm project."
    npm init -y
else
    echo "@@ package.json already exists."
fi

# Install missing packages if not found
install_package() {
    if ! npm list "$1" &> /dev/null; then
        echo "@@ $1 is required."
        npm install "$1"
    else
        echo "@@ $1 is already installed."
    fi
}

# Check and install required npm packages
install_package express
install_package body-parser
install_package express-validator
install_package cors
install_package dotenv
install_package nodemon
install_package eslint

npm install bcryptjs

# Check if MySQL client is installed
if ! command -v mysql &> /dev/null; then
    echo "@@ MySQL client is required."
    sudo apt install -y mysql-client
else
    echo "@@ MySQL client is already installed."
fi

# Check if MySQL server is installed
if ! dpkg -l | grep mysql-server &> /dev/null; then
    echo "@@ MySQL server is required."
    sudo apt install -y mysql-server
else
    echo "@@ MySQL server is already installed."
fi

# Configure MySQL for remote access (automatically)
echo "@@ Configuring MySQL for remote access (bind-address = 0.0.0.0)."
sudo sed -i 's/^bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

echo "Restarting MySQL service..."
sudo systemctl restart mysql

echo "@@ Creating MySQL database and user..."
# Get the directory of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Path to the SQL file
SQL_FILE="$SCRIPT_DIR/public/data/setup.sql"

echo "@@ Creating MySQL database and tables..."
if [ -f "$SQL_FILE" ]; then
    mysql -u root -p < "$SQL_FILE"
else
    echo "Error: SQL file not found at $SQL_FILE"
    exit 1
fi
# Done
echo "@@ Environment setup complete."