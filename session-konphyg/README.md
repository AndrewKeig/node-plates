# session-konphyg

Configuring session stores for express

# Install

    $ npm install session-konphyg

# Usage

Create a JSON based session configuration file, terminated by ".json".

# Examples

session.production.json - configuration using mongo

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


session.json - configuration using in memory

    "session_type": "memory",
    "secret": "010100101010001010",
    "sessionkey" : "express.sid",
    "maxAge" : 3600000,
    "reapInterval" :  "6000000"


Place your configuration files inside a directory called "config".


#createSession

The below example creates the session store for express

    var express = require('express')
        , app = express.createServer()
        , session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession();

        app.use(express.session(connect_session));


#store

The below example allows you to access the store created by createSession

    var session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession();

    var store = session.store();

#options

The below example allows you to access the options used to create the session

    var session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession();

    var options = session.options()


#Environments

If you want to launch the application in production environment:

    $ NODE_ENV=production node app.js
