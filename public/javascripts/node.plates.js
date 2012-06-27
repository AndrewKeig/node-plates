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
    fix_links_client_side_template: function (data) {
        for(item in data.actions){
            if (data.actions[item].href === '/') data.actions[item].href = "/home";
            var href = "/views" + data.actions[item].href + ".html";
            data.actions[item].href = href;
        }
    },
    compile_template: function () {
        var current = this;
        var compiled = dust.compile($(current.id).html(), current.page);
        dust.loadSource(compiled);

        $.getJSON(this.url, null, function (data) {
            current.fix_links_client_side_template(data);

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
            current.fix_links_client_side_template(data);

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
        var current = this;
        $(current.id).show();
    }
};