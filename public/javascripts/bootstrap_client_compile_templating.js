$(document).ready(function(){
    var socket = io.connect(uri,{ port: 8081 });
    node_plates.initialise(socket, dust, page);
    node_plates.compile_template();

    socket.on('hello', function( ){
        alert('socket.io is at you service');
    });

    socket.emit('ready', { true:true });
});