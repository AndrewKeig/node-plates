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

//handle uncaught exceptions
process.title = content_cfg.welcome;
process.addListener('uncaughtException', function (err, stack) {
    console.log('Caught exception: ' + err);
    console.log(err.stack.split('\n'));
});

//configure express
app.configure(function () {
    app.set('views', __dirname + express_cfg.view_path);
    app.set('view engine', express_cfg.view_engine);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.cookieParser('stoom, this is top secret'));
    app.use(express.session({
        secret: 'secret',
        key: 'express.sid'}));
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function () {
    //app.use(express.logger());
    //app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
    app.use(express.static(__dirname + express_cfg.public_path));
});

app.configure('production', function () {
    app.use(express.logger());
    app.use(express.errorHandler());
    app.use(express.static(__dirname + express_cfg.public_path, { maxAge: 31557600000 }));
});

//routes
app.get('/', routes.home.index);
app.get('/about', routes.about.index);
app.get('/contact', routes.contact.index);
app.get('/github', routes.github.index);
app.get('/login', routes.login.get_login);
app.post('/login', routes.login.post_login);
app.get('/channels', lib.middleware.is_user_authenticated, routes.channels.index);
app.get('/logout', routes.login.logout);

//errors
app.get('/404', lib.errors.not_found);
app.get('/500', lib.errors.internal_error);
app.error(lib.errors.error_handler);

//express listen
app.listen(express_cfg.port);

console.log('- express on port %d in %s mode', app.address().port, app.settings.env);