/*!
 * freestyle.session
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* dependencies */
var fs = require('fs');
var path = require('path');

/* library version */
exports.version = '0.0.1';

/* members */
var _store = null;
var _options = {};
var _day = 86400;
var _secret_code = '10101010101';
var _session_key = 'express.sid';
var _http_only = true;
var _path = '/';
var _module_path = __dirname + '/config/session-konphyg';

/* api */
exports.set_module_path = function (path){
    if(path) _module_path = path;
}

exports.options = function (){
    return _options;
}

exports.memory = function (){
    _options = load_configuration();
    return memory();
};

exports.mongo = function (){
    _options = load_configuration();
    return mongo();
};

exports.redis = function (){
    _options = load_configuration();
    return redis();
};

exports.couch = function (){
    _options = load_configuration();
    return couch();
};

exports.memcached = function (){
    _options = load_configuration();
    return memcached();
};

exports.createStore = function (){
    _options = load_configuration();
    return configure_store();
};

exports.createSession = function (){
    _options = load_configuration();
    return configure_session();
};

/* private */
function load_configuration() {
    if (_options) return _options;

    var basePath = path.normalize(_module_path);
    var environment = process.env.NODE_ENV;// || 'development';
    var filePath = path.join(basePath, environment + '.json');
    var response;

    try {
        response = JSON.parse(fs.readFileSync(filePath))
    } catch(err) {
        throw new Error('Error parsing JSON file ' + filePath);
    }

    return response;
};

function configure_store() {
    //default to in memory
    if (!_options) return memory(_options);
    if (!_options.session_type) return memory(_options);
    if (!_options.db) return memory(_options);

    //valid options & session-konphyg type
    if (_options.session_type === 'memory') return memory(_options);
    if (_options.session_type === 'mongo') return mongo(_options);
    if (_options.session_type === 'redis') return redis(_options);
    if (_options.session_type === 'couch') return couch(_options);
    if (_options.session_type === 'memcached') return memcached(_options);
}

function configure_session() {
    var secret = _options.secret || _secret_code;
    var maxAge = _options.maxAge ? new Date(Date.now() + _options.maxAge) : _day;
    var sessionkey = _options.sessionkey || _session_key;
    var httpOnly = _options.httpOnly || _http_only;
    var path = _options.path || _path;

    return { store: _store,
        cookie: { path: '/',
            httpOnly: httpOnly,
            maxAge: maxAge },
        secret: secret,
        key: sessionkey
    };
}

function memory() {
    var express = require('express');
    _store = new express.session.MemoryStore({ reapInterval: _options.reapInterval});
    return _store;
}

function mongo() {
    var MongoStore = require('connect-mongo');
    _store =  new MongoStore(_options.db);
    return _store;
}

function redis() {
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    _store =  new RedisStore(_options.db);
    return _store;
}

function memcached() {
    var express = require('express');
    var MemcachedStore = require('connect-memcached')(express);
    _store =  new MemcachedStore(_options.db);
    return _store;
}

function couch() {
    var express = require('express');
    var ConnectCouchDB = require('connect-couchdb')(express);
    _store =  new ConnectCouchDB(_options.db);
    return _store;
}