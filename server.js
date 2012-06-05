var   http = require('http')
    , path = require('path')
    , konphyg = require('konphyg')(path.join(__dirname, '/config'))
    , express_cfg = konphyg('express')
    , lib = require(path.join(__dirname, '/lib'))
    , routes = require(path.join(__dirname, '/routes'))
    , consolidate = require('consolidate')
    , mongo_cfg = konphyg('mongo')
    , mongoose = require('mongoose')
    , db = mongoose.connect(mongo_cfg.db)
    , express = require('express')
    , app = express.createServer()
    , session = require('session-konphyg')
    , connect_session = session.createSession();

app.engine('html', consolidate.dust);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, express_cfg.view_path));
app.set('db-uri', mongo_cfg.db);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser('10001010101, this is top secret'));
app.use(express.session(connect_session));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, express_cfg.public_path_01)));
app.use(express.static(path.join(__dirname, express_cfg.public_path_02)));
app.use(app.router);
app.use(lib.errors.invalid_password_handler);
app.use(lib.errors.user_not_found_handler);
app.use(lib.errors.user_not_authenticated_handler);

//production settings
app.configure('production', function() {
    app.use(express.logger());
    app.use(express.errorHandler());
});

//routes
app.get('/', routes.home.index);
app.get('/home', routes.home.index);
app.get('/about', routes.about.index);
app.get('/contact', routes.contact.index);
app.get('/github', routes.github.index);
app.get('/login', routes.login.get_login);
app.post('/login', routes.login.post_login);
app.get('/account', lib.middleware.is_user_authenticated, routes.account.index);
app.get('/logout', lib.middleware.is_user_authenticated, routes.login.logout);
app.get('/404', lib.errors.page_not_found_handler);
app.get('/500', lib.errors.internal_error_handler);

app.post('/article', routes.article.save);
app.get('/populate', routes.article.populate);

//handle uncaught exceptions
process.addListener('uncaughtException', lib.errors.uncaught_exception);

//express listen
var server = app.listen(express_cfg.port);

//socket.io setup
var socketIo = new require(path.join(__dirname, '/lib/socket_handler'))(server, session.store(), session.options().sessionkey);

console.log('node plates - express on port %d in %s mode using session', express_cfg.port, app.settings.env, session.options().session_type);