#!/bin/bash

# function to start server
start_server() {
    cd server
    nohup node server.js > ../server.log 2>&1 &
    echo $! > ../server.pid
    cd ..
}

# function to start client
start_client() {
    cd client
    setsid nohup npm run serve > ../client.log 2>&1 &
    echo $! > ../client.pid
    cd ..
}

# check if specific service is given as an argument
if [ "$1" == "server" ]; then
    start_server
elif [ "$1" == "client" ]; then
    start_client
else
    # start both if no argument is given
    start_server
    start_client
fi
