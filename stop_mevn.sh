#!/bin/bash

# function to stop server
stop_server() {
    kill -9 $(cat server.pid)
    rm server.pid
}

# function to stop client
stop_client() {
    kill -- -$(ps -o pgid= $(cat client.pid) | grep -o '[0-9]*')
    rm client.pid
}

# check if specific service is given as an argument
if [ "$1" == "server" ]; then
    stop_server
elif [ "$1" == "client" ]; then
    stop_client
else
    # stop both if no argument is given
    stop_server
    stop_client
fi
