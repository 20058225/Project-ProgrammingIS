if ! command -v node &> /dev/null; then
    echo "@@ Installing node..."
    sudo install node
else
    echo "@@ node is already installed"
fi
if ! command -v npm &> /dev/null; then
    echo "@@ Installing npm..."
    sudo install npm
else
    echo "@@ npm is already installed"
fi

echo "@@ Starting npm"
npm init -y

if ! command -v express fs &> /dev/null; then
    echo "@@ Installing Express..."
    npm install express fs
else
    echo "@@ express fs is already installed"
fi

echo "@@ Running server"
cd server
node server.js