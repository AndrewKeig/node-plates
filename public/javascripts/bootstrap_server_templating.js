$(document).ready(function(){
    var socket = io.connect(uri,{ port: 8081 });
    node_plates.initialise(socket, page);
    node_plates.server_template();

    socket.on('hello', function( ){
        alert('socket.io is at you service');
    });

    socket.emit('ready', { true:true });
});
