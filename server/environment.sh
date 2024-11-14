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
echo "@@ Installing Express"
npm install express fs
echo "@@ Running server"
node server3.js #CHANGE HERE