var   path = require('path')
    , konphyg = require('konphyg')(path.join('', './config'))
    , express_cfg = konphyg('express')
    , consolidate = require('consolidate')
    , mongo_cfg = konphyg('mongo')
    , express = require('express')
    , errors = require(path.join(__dirname, '/errors'));

exports.server = function(http, connect_session){
    http.engine('html', consolidate.dust);
    http.set('view engine', 'html');
    http.set('views', path.join('./', express_cfg.view_path));
    http.set('db-uri', mongo_cfg.db);
    http.use(express.favicon());
    http.use(express.bodyParser());
    http.use(express.cookieParser('10001010101, this is top secret'));
    http.use(express.session(connect_session));
    http.use(express.methodOverride());
    http.use(express.static(path.join('./', express_cfg.public_path_01)));
    http.use(express.static(path.join('./', express_cfg.public_path_02)));
    http.use(http.router);
    http.use(errors.invalid_password_handler);
    http.use(errors.user_not_found_handler);
    http.use(errors.user_not_authenticated_handler);

    //production settings
    http.configure('production', function() {
        http.use(express.logger());
        http.use(express.errorHandler());
    });
};