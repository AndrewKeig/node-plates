var node_plates = {
    socket: null,
    dust: null,
    page: null,
    id: null,
    url: null,
    initialise: function (socket, page) {
        this.socket = socket;
        this.page = page;
        this.id = '#' + page;
        this.url = '/' + page + '/';
        $(this.id).hide();
    },
    initialise: function (socket, dust, page) {
        this.socket = socket;
        this.dust = dust;
        this.page = page;
        this.id = '#' + page;
        this.url = '/' + page + '/';
        $(this.id).hide();
    },
    compile_template: function () {
        var current = this;
        var compiled = dust.compile($(this.page).html(), current.page);
        dust.loadSource(compiled);

        $.getJSON(this.url, null, function (data) {
            dust.render(current.page, data, function(err, out) {
                if(err != null) alert("bollocks");
                document.title = data.title;
                $(current.id).html(out);
                $(current.id).show();
                $.mobile.initializePage();
            });
        });
    },
    pre_compile_template: function (compiled) {
        var current = this;
        dust.loadSource(dust.cache, current.page);

        $.getJSON(this.url, function (data) {
            dust.render(current.page, data, function(err, out) {
                if(err != null) alert("bollocks");
                document.title = data.title;
                $(current.id).html(out);
                $(current.id).show();
                $.mobile.initializePage();
            });
        });
    },
    server_template: function () {
        $(this.id).show();
    }
};