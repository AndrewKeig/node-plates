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
            $(".ui-loader").hide();
            $('#options').append("<li>dust.js enabled with compile per request client side templating</li>");
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
            $('#options').append('<li>dust.js enabled with server side templating</li>');
        }
    });
});