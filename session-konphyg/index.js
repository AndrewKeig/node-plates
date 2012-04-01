/*!
 * session-konphyg
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* dependencies */
var lib = require('./lib');

/* library version */
exports.version = '0.0.1';

/* api */
exports.options = function () {
   return lib.options();
}

exports.store = function () {
   return lib.store();
}

exports.createSession = function (){
    return lib.configure_session();
};