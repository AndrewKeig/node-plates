module.exports = function SocketIo(express, session) {
    var parseCookie = require('connect').utils.parseCookie;
    var io = require('socket.io').listen(express);

    io.configure('production', function(){
        io.enable('browser client minification');  // send minified client
        io.enable('browser client etag');          // apply etag caching logic based on version number
        io.enable('browser client gzip');          // gzip the file
        io.set('log level', 1);                    // reduce logging
        io.set('transports', [                     // enable all transports (optional if you want flashsocket)
            'websocket'
            , 'flashsocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ]);
    });

    io.set('authorization', function(handshakeData, ack) {
        if (!handshakeData.headers.cookie) {
            return ack('No cookie transmitted.', false);
        };
        handshakeData.cookie = parseCookie(handshakeData.headers.cookie);

        //for mongo; pass in key
        //handshakeData.sessionId = handshakeData.cookie['connect.sid'];

        handshakeData.sessionId = handshakeData.cookie['express.sid'];
        handshakeData.sessionID = handshakeData.cookie['express.sid'];
        console.log('- session id: ' + handshakeData.sessionId);
        session.get(handshakeData.sessionId, function(err, sessionData) {
            handshakeData.session = sessionData || {};
            ack(err, err ? false : true);
        });
    });

    io.sockets.on('connection', function(client) {
        var hs = client.handshake;
        console.log('- a socket with sessionId ' + hs.sessionId + ' connected!');
        var intervalID = setInterval(function () {
            hs.session.reload( function () {
                hs.session.touch().save();
            });
        }, 60 * 1000);

        client.on('ready', function (message) {
            console.log('- node.plate client connected and ready to go.');
            console.log(message);
        });

        client.on('channel', function (req) {
            console.log('- node.plate client with sessionId ' + client.handshake.sessionId + ' requested their channel');
        });

        client.on('disconnect', function () {
            console.log('- client has closed browser/disconnected from node.plate');
            clearInterval(intervalID);
        });
    });

    io.sockets.on('error', function(){ console.log(arguments); });

    return io;
};