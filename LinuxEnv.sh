cd Project-ProgrammingIS

sudo apt update

if ! command -v node &> /dev/null; then
    echo "@@ Node.js is required." 
    sudo apt install -y nodejs
else
    echo "@@ Node.js is already installed."
fi

if ! command -v npm &> /dev/null; then
    echo "@@ NPM is required." 
    sudo apt install -y npm
else
    echo "@@ NPM is already installed."
fi

echo "@@ Initializing npm"
npm init -y

echo "@@ Installing necessary packages"
if ! command -v express open fs &> /dev/null; then
    echo "@@ express open fs are required." 
    npm install express open fs
else
    echo "@@ express open fs are already installed."
fi

echo "@@ Installing necessary packages 2"
if ! command -v express body-parser bcrypt express-validator &> /dev/null; then
    echo "@@ express body-parser bcrypt express-validator are required." 
    npm install express body-parser bcrypt express-validator
else
    echo "@@ express open fs are already installed."
fi

echo "@@ Installing necessary packages 3"
if ! command -v cors &> /dev/null; then
    echo "@@ cors is required." 
    npm install cors
else
    echo "@@ ecors is already installed."
fi

echo "@@ Starting server"
node server.js
