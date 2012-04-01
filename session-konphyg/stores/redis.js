exports.get = function (_session_konphyg) {
    var express = require('express');
    var RedisStore = require('connect-redis')(express);
    return new RedisStore(_session_konphyg.db);
}