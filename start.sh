echo "@@ Starting server and file log being created.."
nohup node server.js > server.log 2>&1 &

echo "@@ Server running.."
ps aux | grep node