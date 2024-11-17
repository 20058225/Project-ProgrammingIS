cd server

if ! command -v node &> /dev/null; then
    echo "@@ Node.js is required. 
    install node.js
else
    echo "@@ Node.js is already installed."
fi

if ! command -v npm &> /dev/null; then
    echo "@@ NPM is required. 
    install npm.js
else
    echo "@@ NPM is already installed."
fi

echo "@@ Initializing npm"
npm init -y

echo "@@ Installing necessary packages"
npm install express open fs
npm install express body-parser bcrypt express-validator

echo "@@ Starting server"
node server.js
