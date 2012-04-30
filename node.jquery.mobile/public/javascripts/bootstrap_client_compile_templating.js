$(document).ready(function(){
    var socket = io.connect('127.0.0.1',{ port: 3000 });
    node_plates.initialise(socket, dust);
    node_plates.compile_template();

    socket.on('hello', function( ){
        alert('socket.io is at you service');
    });

    socket.emit('ready', { true:true });
});