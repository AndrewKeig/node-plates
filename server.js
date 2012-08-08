var   http = require('http')
    , https = require('https')
    , path = require('path')
    , config = path.join(__dirname, '/config')
    , konphyg = require('konphyg')(config)
    , express_cfg = konphyg('express')
    , program = require('commander');

program
    .version('0.1.4')
    .option('-m, --mobile', 'using jquery mobile')
    .option('-w, --www', 'using website html 5 boilerplate')
    .option('-c, --client', 'using client side templating')
    .option('-s, --server', 'using server side templating')
    .option('-x, --scale', 'using external storage for sessions')
    .option('-a, --articles', 'using mongo for articles')
    .parse(process.argv);

var template_delivery = express_cfg.template_delivery;
var public_path = express_cfg.www_path;
var show_articles = false;

if (program.mobile)
    public_path = express_cfg.mobile_path;

if (program.client)
    template_delivery = "client";

if (program.scale)
    process.env.NODE_ENV = 'uat';

if (program.articles)
    show_articles = true;

process.env['template_delivery'] = template_delivery;
process.env['show_articles'] = show_articles;

var   lib = require(path.join(__dirname, '/lib'))
    , routes = require(path.join(__dirname, '/routes'))
    , consolidate = require('consolidate')
    , mongo_cfg = konphyg('mongo')
    , mongoose = require('mongoose')
    , db = mongoose.connect(mongo_cfg.db)
    , express = require('express')
    , app = express.createServer()
    , session = require('session-konphyg')
    , connect_session = session.createSession(config)
    , fs = require('fs')
    , socketIo = require(path.join(__dirname, '/lib/socket_handler'));


//configure
app.engine('html', consolidate.dust);
app.set('view engine', 'html');
app.set('template delivery', template_delivery);
app.set('show_articles', show_articles);
app.set('views', path.join(__dirname, public_path + "views"));
app.set('db-uri', mongo_cfg.db);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser('10001010101, this is top secret'));
app.use(express.session(connect_session));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, public_path)));
app.use(express.static(path.join(__dirname, express_cfg.public_path)));
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
app.post('/article', routes.article.save);
app.get('/populate', routes.article.populate);
app.get('*', routes.errors.page_not_found);

//handle uncaught exceptions
process.addListener('uncaughtException', lib.errors.uncaught_exception);

//http listen
var httpServer = http.createServer(app.handle.bind(app)).listen(express_cfg.http_port);
var httpSocketIo = new socketIo(httpServer, session.store(), session.options(config).sessionkey);

//https listen
var httpsServer = https.createServer(lib.authentication.options(), app.handle.bind(app)).listen(express_cfg.https_port);
var httpsSocketIo =new socketIo(httpsServer, session.store(), session.options(config).sessionkey);

console.log(' - node plates');
console.log(' - %s mode', app.settings.env);
console.log(' - running express on port %d ',express_cfg.http_port);
console.log(' - https on port %d ',express_cfg.https_port);
console.log(' - using %s session ', session.options(config).session_type);
console.log(' - view engine %s ', express_cfg.view_engine);
console.log(' - public path %s ', public_path);
console.log(' - %s side templating', (program.client) ? 'client' : 'server');
console.log(' - site is %s', (program.mobile) ? 'mobile' : 'www' );
console.log(' - certificate %s', express_cfg.cert);
console.log(' - certificate key %s', express_cfg.key);
console.log(' - certificate ca %s', express_cfg.ca);
console.log(' - %s articles', (process.env['show_articles'] === 'true') ? 'display' : 'hide');
console.log(' - view site with %s side templating on http://127.0.0.1:%s%s ',
    (program.client) ? 'client' : 'server', express_cfg.http_port, (program.client) ? '/views/home.html' : '');
