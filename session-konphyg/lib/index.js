/* members */
var _store = null;
var _day = 86400;
var _secret_code = '10101010101';
var _session_key = 'express.sid';
var _http_only = true;
var _path = '/';


/* privates */
exports.configure_store = function (session_konphyg) {
    //default to in memory
    if (!session_konphyg) return memory();
    if (!session_konphyg.session_type) return memory();
    if (!session_konphyg.db) return memory();

    //valid options & session-konphyg type
    if (session_konphyg.session_type === 'memory') return memory();
    if (session_konphyg.session_type === 'mongo') return mongo();
    if (session_konphyg.session_type === 'redis') return redis();
    if (session_konphyg.session_type === 'couch') return couch();
    if (session_konphyg.session_type === 'memcached') return memcached();
}

exports.configure_session = function (session_konphyg) {
    var secret = session_konphyg.secret || _secret_code;
    var maxAge = session_konphyg.maxAge ? new Date(Date.now() + session_konphyg.maxAge) : _day;
    var sessionkey = session_konphyg.sessionkey || _session_key;
    var httpOnly = session_konphyg.httpOnly || _http_only;
    var path = session_konphyg.path || _path;

    return { store: _store,
        cookie: { path: '/',
            httpOnly: httpOnly,
            maxAge: maxAge },
        secret: secret,
        key: sessionkey
    };
}

exports.memory = function (session_konphyg) {
    var express = require('express');
    _store = new express.session.MemoryStore({ reapInterval: session_konphyg.reapInterval});
    return _store;
}

exports.mongo = function (session_konphyg) {
    var MongoStore = require('connect-mongo');
    _store =  new MongoStore(session_konphyg.db);
    return _store;
}

exports.redis = function (session_konphyg) {
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    _store =  new RedisStore(session_konphyg.db);
    return _store;
}

exports.memcached = function (session_konphyg) {
    var express = require('express');
    var MemcachedStore = require('connect-memcached')(express);
    _store =  new MemcachedStore(session_konphyg.db);
    return _store;
}

exports.couch = function (session_konphyg) {
    var express = require('express');
    var ConnectCouchDB = require('connect-couchdb')(express);
    _store =  new ConnectCouchDB(session_konphyg.db);
    return _store;
}