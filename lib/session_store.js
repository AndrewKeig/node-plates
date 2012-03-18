var express = require('express');

exports.get = function(config) {
    var options = {};
    if (!config) return new express.session.MemoryStore;
    if (config.db) options = { db:config.db.db}

    if (config.session_type === 'mongo') {
        var MongoStore = require('connect-mongo');
        return new MongoStore(options);
    }

    if (config.session_type === 'redis') {
        var RedisStore = require('connect-redis')(express);
        return new RedisStore(options);
    }

    return new express.session.MemoryStore;
}