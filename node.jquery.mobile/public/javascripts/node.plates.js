var node_plates = {
    socket: null,
    dust: null,
    initialise: function (socket, dust) {
        this.socket = socket;
        this.dust = dust;
        this.reset();
    },
    reset: function () {
        //$('#about').hide();
    },
    compile_template: function () {
        var compiled = dust.compile($("#about").html(), "about");
        dust.loadSource(compiled);

        $.getJSON('/about/', null, function (data) {
            dust.render("about", data, function(err, out) {
                if(err != null) alert("bollocks");
                //document.title = data.title;
                $("#about").html(out);
                $('#about').show();
            });
        });
    },
    pre_compile_template: function (compiled) {
        dust.loadSource(dust.cache.about, "about");

        $.getJSON('/about/', null, function (data) {
            dust.render("about", data, function(err, out) {
                if(err != null) alert("bollocks");
                document.title = data.title;
                $("#about").html(out);
                $('#about').show();
            });
        });
    },
    server_template: function () {
        $('#about').show();
    }
};