exports.get = function (_session_konphyg) {
    var express = require('express');
    var MemcachedStore = require('connect-memcached')(express);
    return new MemcachedStore(_session_konphyg.db);
}