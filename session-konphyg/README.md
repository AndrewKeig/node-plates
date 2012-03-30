# session-konphyg

Configuring session stores for express

# Install

    $ npm install session-konphyg

# Usage

Create a JSON based session configuration files, terminated by ".json".

# Examples

production configuration using mongo
{
    "session_type": "mongo",
    "secret": "010100101010001010",
    "sessionkey" : "connect.sid",
    "maxAge" : 3600000,
    "db": {
        "db": "nodeplates",
        "host": "127.0.0.1",
        "port": 27017,
        "collection": "sessions",
        "clear_interval": 1000,
        "auto_reconnect": false
    }
}

dev configuration using in memory
{
    "session_type": "memory",
    "secret": "010100101010001010",
    "sessionkey" : "express.sid",
    "maxAge" : 3600000,
    "reapInterval" :  "6000000"
}

Place your configuration files inside a directory called "config".

The below example creates the session store for express

    var express = require('express')
        , app = express.createServer()
        , session = require(__dirname + '/session-konphyg')
        , connect_store = session.createStore()
        , connect_session = session.createSession();

        app.use(express.session(connect_session));

If you want to launch a node process using the 'production' environment you should then do something like:

    $ NODE_ENV=production node app.js
