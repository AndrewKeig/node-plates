
$(function() {
    ServerTemplateView = Backbone.View.extend({
        url: '/' + page + '/',
        id: '#' + page,

        initialize: function() {
            $(this.id).hide();
            this.render();
        },
        render: function() {
            $(this.id).show();

            setTimeout(function() {
                $('#options').append('<li>dust.js enabled with server side templating</li>');},1250
            );
        }
    });
});

$(document).ready(function(){
    var view = new ServerTemplateView(page);
    var socket = io.connect(uri,{ port: uri_port });

    socket.on('hello', function( ){
        setTimeout(function() {
            $('#options').append('<li>socket.io is enabled</li>');},1250
        );
    });

    socket.emit('ready', { true:true });
});
