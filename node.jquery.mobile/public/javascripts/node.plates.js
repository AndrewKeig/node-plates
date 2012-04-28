var nodeplates = {
    socket: null,
    dust: null,
    initialise: function (socket, dust) {
        this.socket = socket;
        this.dust = dust;
        this.reset();
        this.render();
    },
    reset: function () {
       $('#index').hide();
    },
    render: function () {
        $.getJSON('/login/', null, function (data) {
            var compiled = dust.compile($("#index").html(), "index");
            dust.loadSource(compiled);

            dust.render("index", data, function(err, out) {
                if(err != null)
                    alert("bollocks");
                document.title = data.title;
                $("#index").html(out);
                $('#index').show();
            });
        });
    }
};