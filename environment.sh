if ! command -v node &> /dev/null; then
    echo "@@ Node.js is required. Please install it from https://nodejs.org."
else
    echo "@@ Node.js is already installed."
fi

if ! command -v npm &> /dev/null; then
    echo "@@ NPM is required. Please install it from https://nodejs.org."
else
    echo "@@ NPM is already installed."
fi

echo "@@ Initializing npm"
npm init -y

echo "@@ Installing necessary packages"
npm install express open fs

echo "@@ Starting server"
cd server
node server.js
