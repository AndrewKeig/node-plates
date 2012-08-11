$(function() {
    CompiledClientTemplateView = Backbone.View.extend({
        url: '/' + page + '/',
        id: '#' + page,

        initialize: function() {
            $(this.id).hide();
            this.render();
        },
        compile_template: function () {
            var current = this;
            dust.loadSource(dust.cache, current.page);

            $.getJSON(this.url, null, function (data) {
                dust.render(page, data, function(err, out) {
                    if(err != null) console.log("Unable to render view.");
                    document.title = data.title;
                    $(current.id).html(out);
                    $(current.id).show();
                    if ($.mobile)
                      $.mobile.initializePage();
                });
            });
        },
        render: function() {
            this.compile_template();
            $(this.id).show();

            //setTimeout(function() {
            //        $('#options').append('<li>dust.js enabled with pre compiled client side templating</li>');},1250
            //);

            $('#options').append('<li>dust.js enabled with pre compiled client side templating</li>');
        }
    });
});

$(function() {
    ClientTemplateView = Backbone.View.extend({
        url: '/' + page + '/',
        id: '#' + page,

        initialize: function() {
            $(this.id).hide();
            this.render();
        },
        compile_template: function () {
            var current = this;

            var compiled = dust.compile($(this.id).html(), page);
            dust.loadSource(compiled);

            $.getJSON(this.url, null, function (data) {
                dust.render(page, data, function(err, out) {
                    if(err != null) console.log("Unable to render view.");
                    document.title = data.title;
                    $(current.id).html(out);
                    $(current.id).show();
                    if ($.mobile)
                      $.mobile.initializePage();
                });
            });
        },
        render: function() {
            this.compile_template();
            $(this.id).show();

            setTimeout(function() {
                $('#options').append("<li>dust.js enabled with compile per request client side templating</li>");},1250
            );

            $(".ui-loader").hide();

            //$('#options').append("<li>dust.js enabled with compile per request client side templating</li>");
        }
    });
});

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

            //setTimeout(function() {
            //        $('#options').append('<li>dust.js enabled with server side templating</li>');},1250
            //);
            $('#options').append('<li>dust.js enabled with server side templating</li>');
        }
    });
});


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
            //setTimeout(function() {
            //        $('#options').append('<li>socket.io is enabled</li>');},1250
            //);
            $('#options').append('<li>socket.io is enabled</li>');
        });

        socket.emit('ready', { true:true });
    });
});