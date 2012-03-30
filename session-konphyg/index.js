/*!
 * session-konphyg
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* dependencies */
var konphyg = require('konphyg')('./config')
    , session_konphyg = konphyg('session')
    , lib = require('./lib');

/* library version */
exports.version = '0.0.1';


/* api */
exports.options = function () {
   return session_konphyg;
}

exports.memory = function (){
    return lib.memory(session_konphyg);
};

exports.mongo = function (){
    return lib.mongo(session_konphyg);
};

exports.redis = function (){
    return lib.redis(session_konphyg);
};

exports.couch = function (){
    return lib.couch(session_konphyg);
};

exports.memcached = function (){
    return lib.memcached(session_konphyg);
};

exports.createStore = function (){
    return lib.configure_store(session_konphyg);
};

exports.createSession = function (){
    return lib.configure_session(session_konphyg);
};

