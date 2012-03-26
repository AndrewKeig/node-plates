//author : andrew keig
//email : andrew.keig@gmail.com

//version/
exports.version = '0.0.1';

//expose
exports.memory = memory();
exports.mongo = mongo();
exports.redis = redis();
exports.load = load();

//privates
function load(options) {
    console.log(options);
    //default to in memory
    if (!options) return memory(options);
    if (!options.session_type) return memory(options);
    if (!options.db) return memory(options);

    //valid options & session type
    if (options.session_type === 'memory') memory(options);
    if (options.session_type === 'mongo') mongo(options);
    if (options.session_type === 'redis') redis(options);
}

function memory(options) {
    var express = require('express');
    return store(new express.session.MemoryStore({ reapInterval: options.reapInterval}), options);
}

function mongo(options) {
    var MongoStore = require('connect-mongo');
    return store(new MongoStore(options));
}

function redis(options) {
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    return store(new RedisStore(options), options);
}

function store(store, options)
{
    var secret = options.secret || '10101010101';
    var maxAge = options.maxAge ? new Date(Date.now() + options.maxAge) : 14400000;
    var sessionkey = options.sessionkey || 'express.sid';
    var httpOnly = options.httpOnly || true;
    var path = options.path || '/';

    return { store: store,
        cookie: { path: '/', httpOnly: httpOnly, maxAge: maxAge },
        secret: secret,
        key: sessionkey
    }
}