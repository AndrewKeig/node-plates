var   http = require('http')
    , https = require('https')
    , path = require('path')
    , config = path.join(__dirname, '/config')
    , konphyg = require('konphyg')(config)
    , express_cfg = konphyg('express')
    , program = require('commander');

program
    .version('0.1.8')
    .option('-m, --mobile', 'use jquery mobile')
    .option('-w, --www', 'use website html 5 boilerplate')
    .option('-c, --client', 'use client side templating')
    .option('-s, --server', 'use server side templating')
    .option('-a, --articles', 'display article content')
    .option('-x, --scale', 'use external storage for sessions/registrations/articles using mongoDb')
    .parse(process.argv);

process.env['template_delivery'] = express_cfg.template_delivery;
var public_path = express_cfg.www_path;
var show_content = false;
var scale = false;

if (program.mobile)
    public_path = express_cfg.mobile_path;

if (program.client)
    process.env['template_delivery'] = "client";

if (program.scale) {
    scale = true;
    process.env.NODE_ENV = 'uat';
    process.env['scale'] = scale;
}

var lib = require(path.join(__dirname, '/lib'));

if (program.articles) {
    lib.article.populate();
    process.env['show_content'] = true;
}

var   routes = require(path.join(__dirname, '/routes'))
    , consolidate = require('consolidate')
    , mongo_cfg = konphyg('mongo')
    , mongoose = require('mongoose')
    , db = mongoose.connect(mongo_cfg.db)
    , express = require('express')
    , app = express()
    , session = require('session-konphyg')
    , connect_session = session.createSession(config)
    , fs = require('fs')
    , socketIo = require(path.join(__dirname, '/lib/socket_handler'));


//configure
app.engine('html', consolidate.dust);
app.set('view engine', 'html');
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
app.get('/register', routes.register.get_register);
app.post('/register', routes.register.post_register);
app.get('/account', lib.middleware.is_user_authenticated, routes.account.index);
app.get('/logout', lib.middleware.is_user_authenticated, routes.login.logout);
app.get('*', routes.errors.page_not_found);

//handle uncaught exceptions
process.addListener('uncaughtException', lib.errors.uncaught_exception_handler);

//http listen
var httpServer = http.createServer(app.handle.bind(app)).listen(express_cfg.http_port);
var httpSocketIo = new socketIo(httpServer, session.store(), session.options(config).sessionkey);

//https listen
var httpsServer = https.createServer(lib.authentication.options(), app.handle.bind(app)).listen(express_cfg.https_port);
var httpsSocketIo =new socketIo(httpsServer, session.store(), session.options(config).sessionkey);


//--------------------------------------------------

console.log(' ');
console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
console.log(' - node plates is running');
console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
console.log(' ');
console.log(' - in %s mode', app.settings.env);
console.log(' - using express on port %d ',express_cfg.http_port);
console.log(' - with https on port %d ',express_cfg.https_port);
console.log(' - using %s for storing sessions', session.options(config).session_type);
console.log(' - to a cookie with key %s', session.options(config).sessionkey);
console.log(' - this is a %s site', (program.mobile) ? 'mobile' : 'www' );
console.log(' - using the %s view engine ', express_cfg.view_engine);
console.log(' - with %s side templating for views', (program.client) ? 'client' : 'server');
console.log(' - the public path is %s ', public_path);
console.log(' - certificate %s', express_cfg.cert);
console.log(' - certificate key %s', express_cfg.key);
console.log(' - certificate ca %s', express_cfg.ca);

if (process.env['show_content'] === 'true') {
  console.log(' - article content displayed on home page auto-populated to a mongo store');
  console.log(' - please make sure mongo is running here ' + mongo_cfg.db);
} else {
  console.log(' - we are not displaying articles');
}

console.log(' - you can view the site in your browser by visiting http://127.0.0.1:%s%s ',
     express_cfg.http_port, (program.client) ? '/views/home.html' : '');

console.log(' ');
console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
console.log(' - airasoul.net');
console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
console.log(' ');