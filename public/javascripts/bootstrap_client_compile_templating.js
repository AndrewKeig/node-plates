$(document).ready(function(){
    var socket = io.connect('127.0.0.1',{ port: 8080 });
    node_plates.initialise(socket, dust, page);
    node_plates.compile_template();

    socket.on('hello', function( ){
        alert('socket.io is at you service');
    });

    socket.emit('ready', { true:true });
});