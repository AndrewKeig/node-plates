var boxhop = {
    socket: null,
    initialise: function (socket) {
        this.socket = socket;
        this.reset();
    },
    reset: function () {
        this.hide_content();
        this.hide_loading();
        this.hide_video();
    },
    show_login_form: function () {
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'GET',
            dataType: 'html',
            contentType: 'application/html; charset=utf-8',
            url: '/login/',
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    submit_login_form: function () {
        var post_form = $('#login_form');
        var data = post_form.serialize();
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'POST',
            data: data,
            url: '/login/',
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    show_add_channel_form: function () {
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'GET',
            dataType: 'html',
            contentType: 'application/html; charset=utf-8',
            url: '/addchannel/',
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    submit_add_channel_form: function () {
        //var channel = $('#add_channel_text').val();
        //if (channel === '') return;
        var post_form = $('#addchannel_form');
        var data = post_form.serialize();
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'POST',
            data: data,
            url: '/addchannel/',
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    show_channels: function () {
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'GET',
            dataType: 'html',
            contentType: 'application/html; charset=utf-8',
            url: '/channels/',
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    show_channel_videos: function (me) {
        var id = $(me).attr('data-val');
        this.reset();
        this.show_loading();
        $.ajax({
            type: 'GET',
            dataType: 'html',
            contentType: 'application/html; charset=utf-8',
            url: '/channel/'+id,
            success: function (response) {
                boxhop.show_content(response);
            }
        });
        this.hide_loading();
    },
    play_video: function (me) {
        this.reset();
        $('#video').attr('src', $(me).find('img').attr('data-val'));
        this.show_video();
    },
    show_loading: function () {
        $('#loading').show();
    },
    hide_loading: function () {
        $('#loading').hide();
    },
    show_content: function (content) {
        $("#content_container").html(content);
        $("#content_container").show();
    },
    hide_content: function () {
        $("#content_container").html('');
        $("#content_container").hide();
    },
    show_video: function () {
        $('#video_container').show();
    },
    hide_video: function () {
        $('#video_container').hide();
    },
    illuminate: function (me) {
        $(me).addClass("opacity");
    },
    un_illuminate: function (me) {
        $(me).removeClass("opacity");
    },
    toggle_login_form: function (){
        if ($('#login_container').is(":visible")) {
            this.hide_content();
        }
        else {
            this.show_login_form();
        }
    },
    toggle_channels: function (){
        if ($('#channel_container').is(":visible")) {
            this.hide_content();
        }
        else {
            this.show_channels();
        }
    },
    toggle_add_channel_form: function (){
        if ($('#add_channel_container').is(":visible")) {
            this.hide_content();
        }
        else {
            this.show_add_channel_form();
        }
    }
};