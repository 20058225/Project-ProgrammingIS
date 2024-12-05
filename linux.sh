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
    npm install express body-parser express-validator bcryptjs
else
    echo "@@ express open fs are already installed."
fi

echo "@@ Installing Cors"
if ! command -v cors &> /dev/null; then
    echo "@@ Cors is required." 
    npm install cors
else
    echo "@@ Cors is already installed."
fi

echo "@@ Installing Dotenv"
if ! command -v dotenv &> /dev/null; then
    echo "@@ Dotenv is required." 
    npm install dotenv
else
    echo "@@ Dotenv is already installed."
fi

echo "@@ Installing Nodemon"
if ! command -v nodemon &> /dev/null; then
    echo "@@ Nodemon is required." 
    npm install --save-dev nodemon
else
    echo "@@ Nodemon is already installed."
fi

echo "@@ Installing Eslint"
if ! command -v eslint &> /dev/null; then
    echo "@@ Eslint is required." 
    npm install --save-dev eslint
else
    echo "@@ Eslint is already installed."
fi

echo "@@ Installing MySql"
if ! command -v mysql &> /dev/null; then
    echo "@@ MySql is required." 
    npm install mysql
    npm install mysql2
    sudo apt install -y mysql-client
else
    echo "@@ MySql is already installed."
fi

echo "@@ Starting server and file log being created.."
nohup node server.js > server.log 2>&1 &

echo "@@ Server running.."
ps aux | grep node