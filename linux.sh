git clone https://github.com/20058225/Project-ProgrammingIS
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
if ! command -v express body-parser express-validator &> /dev/null; then
    echo "@@ express body-parser express-validator are required." 
    npm install express body-parser express-validator
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

echo "@@ Installing body-parser"
if ! command -v body-parser &> /dev/null; then
    echo "@@ body-parser is required." 
    npm install body-parser
else
    echo "@@ body-parser is already installed."
fi

echo "@@ Installing dotenv"
if ! command -v dotenv &> /dev/null; then
    echo "@@ dotenv is required." 
    npm install dotenv
else
    echo "@@ dotenv is already installed."
fi

echo "@@ Installing nodemon"
if ! command -v nodemon &> /dev/null; then
    echo "@@ nodemon is required." 
    npm install --save-dev nodemon
else
    echo "@@ dotenv is already installed."
fi

echo "@@ Installing eslint"
if ! command -v eslint &> /dev/null; then
    echo "@@ eslint is required." 
    npm install --save-dev eslint
else
    echo "@@ eslint is already installed."
fi

echo "@@ Installing MySql"
if ! command -v mysql &> /dev/null; then
    echo "@@ mysql is required." 
    npm install mysql
    npm install mysql2
    sudo apt install -y mysql-client
else
    echo "@@ MySql is already installed."
fi

echo "@@ Starting server"
node server.js
