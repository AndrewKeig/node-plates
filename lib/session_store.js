/*!
 * connect-session-abs
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* Library version */
exports.version = '0.0.1';

/* Module dependencies */


/* session defaults */
var _day = 86400;
var _secret_code = '10101010101';
var _session_key = 'express.sid';
var _http_only = true;
var _path = '/';

/* api */
exports.memory = function (options){return memory(options) };
exports.mongo = function (options){return mongo(options) };
exports.redis = function (options){return redis(options) };
exports.couch = function (options){return couch(options) };
exports.memcached = function (options){return memcached(options) };

exports.load = function (options){return load(options) };
exports.connect_session = function (store, options){return connect_session(store, options) };

/* private */
function load(options) {
    //default to in memory
    if (!options) return memory(options);
    if (!options.session_type) return memory(options);
    if (!options.db) return memory(options);

    //valid options & session type
    if (options.session_type === 'memory') return memory(options);
    if (options.session_type === 'mongo') return mongo(options);
    if (options.session_type === 'redis') return redis(options);
    if (options.session_type === 'couch') return couch(options);
    if (options.session_type === 'memcached') return memcached(options);
}

function memory(options) {
    var express = require('express');
    return new express.session.MemoryStore({ reapInterval: options.reapInterval});
}

function mongo(options) {
    var MongoStore = require('connect-mongo');
    return new MongoStore(options.db);
}

function redis(options) {
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    return new RedisStore(options.db);
}

function memcached(options) {
    var express = require('express');
    var MemcachedStore = require('connect-memcached')(express);
    return new MemcachedStore(options.db);
}

function couch(options) {
    var express = require('express');
    var ConnectCouchDB = require('connect-couchdb')(express);
    return new ConnectCouchDB(options.db);
}

function connect_session(store, options) {
    var secret = options.secret || _secret_code;
    var maxAge = options.maxAge ? new Date(Date.now() + options.maxAge) : _day;
    var sessionkey = options.sessionkey || _session_key;
    var httpOnly = options.httpOnly || _http_only;
    var path = options.path || _path;

    return { store: store,
        cookie: { path: '/',
            httpOnly: httpOnly,
            maxAge: maxAge },
        secret: secret,
        key: sessionkey
    };
}