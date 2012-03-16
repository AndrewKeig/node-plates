var http = require('http');
var events = require("events");
var util = require('util');
var konphyg = require('konphyg')(__dirname + '/config');
var express_cfg = konphyg('express');
var content_cfg = konphyg('content');
var lib = require(__dirname + '/lib');
var routes = require(__dirname + '/routes');
var express = require('express');
var app = express.createServer();
var MemoryStore = express.session.MemoryStore;
var store = new MemoryStore();
var Session = require('connect').middleware.session.Session;

//configure express
app.configure(function () {
    app.set('views', __dirname + express_cfg.view_path);
    app.set('view engine', express_cfg.view_engine);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.cookieParser('10001010101, this is top secret'));
    app.use(express.session({store: store, secret: '01010101010', key: express_cfg.sessionkey}));
    app.use(express.methodOverride());
    app.use(express.static(__dirname + express_cfg.public_path));
    app.use(app.router);
});

app.configure('development', function () {
    //app.use(express.logger());
    //app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
    app.use(lib.errors.invalid_password_handler);
    app.use(lib.errors.user_not_found_handler);
    app.use(lib.errors.user_not_authenticated_handler);
});

app.configure('production', function () {
    app.use(express.logger());
    app.use(express.errorHandler());
});

//routes
app.get('/', routes.home.index);
app.get('/about', routes.about.index);
app.get('/contact', routes.contact.index);
app.get('/github', routes.github.index);
app.get('/login', routes.login.get_login);
app.post('/login', routes.login.post_login);
app.get('/account', lib.middleware.is_user_authenticated, routes.account.index);
app.get('/logout', lib.middleware.is_user_authenticated, routes.login.logout);

//errors
app.get('/404', lib.errors.page_not_found_handler);
app.get('/500', lib.errors.internal_error_handler);
app.get('/*', lib.errors.page_not_found_handler);

//handle uncaught exceptions
process.addListener('uncaughtException', lib.errors.uncaught_exception);

//express listen
app.listen(express_cfg.port);

//socket.io setup
var socketIo = new require(__dirname + '/lib/socket_handler')(app, store, express_cfg.sessionkey);

console.log(content_cfg.welcome + ' - express on port %d in %s mode', app.address().port, app.settings.env);