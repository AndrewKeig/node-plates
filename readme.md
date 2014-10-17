# node-plates 

 a node.js boilerplate using express, socket.io, mongooose, jquery.mobile & html 5 mobile/web application.
 
 [![NPM](https://nodei.co/npm/node-plates.png?downloads=true&stars=true)](https://nodei.co/npm/node-plates/)

## Installation

    $ npm install node-plates

## Usage

    $ node server.js
    $ node server.js -m  use jquery mobile
    $ node server.js -w, use website html 5 boilerplate
    $ node server.js -c, use client side templating
    $ node server.js -s, use server side templating
    $ node server.js -a, display article content
    $ node server.js -x, use external storage for sessions/registrations/articles using mongoDb


## Dependencies

Requires mongoDb via mongoose in order to use the scale option -x

Run mongodb before starting node-plates using the following; where some_data_path is your path to
a mongoDb instance data folder.   Will throw an 'error connecting to database' if not running..

    $ mongod --dbpath some_data_path

## Current setup includes

- [Environment cascading configuration files using konphyg]
- Environment based module load
- Express; with some best practices in place such as:
 - [Error handling with error middleware]
 - [Routes seperated into modules and exported]
 - [Content Negotiation]
 - Route middleware
 - Express production configuration
- [Configuring session stores using konphyg for: ]
 - In memory
 - Mongo
 - Redis
 - Couch
 - Memcache
- [Supporting multiple view engines using consolidate.js]
- [Templating using dust.js]
 - Server side templating using dust.js
 - Client side templating using dust.js; with pre-compilation or client side compilation
- JQuery Mobile template
- Html5 boilerplate template
- Using Backbone.js for cleaner javascript
- Socket.io
 - Socket.io handshake with express using configurable sessions
 - Socket.io production configuration
- <a href="http://airasoul.blogspot.co.uk/2012/06/nodejs-boilerplate-ssltls-with-express.html">Forms authentication via SSL TLS for secure login/my account pages</a>
-  In/out of process storage
 - scale article content, registrations and sessions using mongoDb
 - will default to using NStore; an in process key/value store for article content, registrations and sessions



