var   path = require('path')
    , konphyg = require('konphyg')(path.join(__dirname, '/config'))
    , express_cfg = konphyg('express')
    , lib = require(path.join(__dirname, '/lib'))
    , routes = require(path.join(__dirname, '/routes'))
    //, consolidate = require('consolidate')
    , mongo_cfg = konphyg('mongo')
    , mongoose = require('mongoose')
    , db = mongoose.connect(mongo_cfg.db)
    , express = require('express')
    , http = express.createServer()
    , https = express.createServer(lib.authentication.options())
    , session = require('session-konphyg')
    , connect_session = session.createSession();

lib.configure.server(http, connect_session);
lib.configure.server(https, connect_session);

//http routes
http.get('/', routes.home.index);
http.get('/home', routes.home.index);
http.get('/about', routes.about.index);
http.get('/contact', routes.contact.index);
http.get('/github', routes.github.index);
http.get('/login', routes.login.get_login);
http.post('/login', routes.login.post_login);
http.get('/account', lib.middleware.is_user_authenticated, routes.account.index);
http.get('/logout', lib.middleware.is_user_authenticated, routes.login.logout);
http.get('/404', lib.errors.page_not_found_handler);
http.get('/500', lib.errors.internal_error_handler);
http.post('/article', routes.article.save);
http.get('/populate', routes.article.populate);

//https routes
https.post('/login', routes.login.post_login);
https.get('/help', function(req, res){
    res.json("HELP");
});

//express listen
var httpsServer = https.listen(443);
var httpServer = http.listen(express_cfg.port);

//socket.io setup
var httpSocketIo = new require(path.join(__dirname, '/lib/socket_handler'))(httpServer, session.store(), session.options().sessionkey);
var httpsSocketIo = new require(path.join(__dirname, '/lib/socket_handler'))(httpsServer, session.store(), session.options().sessionkey);

//handle uncaught exceptions
process.addListener('uncaughtException', lib.errors.uncaught_exception);

console.log('node plates - express on port %d in %s mode using session', express_cfg.port, http.settings.env, session.options().session_type);