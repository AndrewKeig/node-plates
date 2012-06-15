module.exports = function SocketIo(server, session, key) {
    var parseCookie = require('connect').utils.parseCookie;
    var io = require('socket.io').listen(server);
    io.set('log level', 1);
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);

    io.configure('production', function(){
        //io.set("transports", ["xhr-polling"]);
        //io.set("polling duration", 10);
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

    io.configure('productionLongPolling', function(){
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });

    io.set('authorization', function(handshakeData, ack) {
        if (!handshakeData.headers.cookie) {
            return ack('No cookie transmitted.', false);
        };
        handshakeData.cookie = parseCookie(handshakeData.headers.cookie);
        handshakeData.sessionID = handshakeData.cookie[key];
        console.log('- sessionID: ' + handshakeData.sessionID);
        session.get(handshakeData.sessionId, function(err, sessionData) {
            handshakeData.session = sessionData || {};
            handshakeData.sid = handshakeData.sessionId;
            ack(err, err ? false : true);
        });
    });

    io.sockets.on('connection', function(client) {
        var hs = client.handshake;
        console.log('- a socket with sessionID ' + hs.sessionID + ' connected!');
        var intervalID = setInterval(function () {
            //hs.session.reload( function () {
                //hs.session.touch().save();
            //});
        }, 60 * 1000);

        client.on('ready', function (message) {
            console.log('- client with sessionID ' + client.handshake.sessionID + ' is ready');
            console.log(message);
            client.emit('hello');
        });

        client.on('disconnect', function () {
            console.log('- client has closed browser/disconnected from node-plate');
            clearInterval(intervalID);
        });
    });

    io.sockets.on('error', function(){ console.log(arguments); });

    return io;
};