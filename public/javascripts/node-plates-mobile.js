$("div[data-role*='page']").live('pageshow', function(event, ui) {
    $().ready(function() {
        if (rendered === 'true')
            var view = new ServerTemplateView(page);
        else
            var view = new ClientTemplateView(page);

        //precompiled templates
        //var view = new CompiledClientTemplateView(page);

        var socket = io.connect(uri,{ port: uri_port });

        socket.on('hello', function( ){
            $('#options').append('<li>socket.io is enabled</li>');
        });

        socket.emit('ready', { true:true });
    });
});