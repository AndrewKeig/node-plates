var http = require('http')
    , path = require('path')
    , konphyg = require('konphyg')(path.join(__dirname, '/config'))
    , express_cfg = konphyg('express')
    , content_cfg = konphyg('content')
    , lib = require(path.join(__dirname, '/lib'))
    , routes = require(path.join(__dirname, '/routes'))
    , express = require('express')
    , app = express.createServer()
    , session = require('session-konphyg')
    , connect_session = session.createSession();

app.set('views', path.join(__dirname, express_cfg.view_path));
app.set('view engine', express_cfg.view_engine);
app.set('view options',{layout:true});
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser('10001010101, this is top secret'));
app.use(express.session(connect_session));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, express_cfg.public_path)));
//app.use(express.vhost('127.0.0.1:3000', require(express_cfg.mobile).app));
//app.use(express.vhost('127.0.0.1:8000', require(express_cfg.www).app));
app.use(app.router);
app.use(lib.errors.invalid_password_handler);
app.use(lib.errors.user_not_found_handler);
app.use(lib.errors.user_not_authenticated_handler);

//production settings
if (process.env.NODE_ENV == 'production') {
    app.use(express.logger());
    app.use(express.errorHandler());
    //app.use(express.static(path.join(__dirname,  express_cfg.public_path), { maxAge: oneYear }));
    //app.use('/static', connectGzip.staticGzip(path.join(__dirname, express_cfg.public_path),  {maxAge: 365 * 24 * 60 * 60 * 1000}));

    // private key and certificate for https server
    //var credentials = {
    //    key: fs.readFileSync(path.join(__dirname, '/keys/localhost.key')),
    //    cert: fs.readFileSync(path.join(__dirname, '/keys/localhost.crt'))
    //};

    // https server
    //var app = module.exports = express.createServer(credentials);
}

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
var socketIo = new require(path.join(__dirname, '/lib/socket_handler'))(app, session.store(), session.options().sessionkey);

console.log(content_cfg.welcome + ' - express on port %d in %s mode', app.address().port, app.settings.env);