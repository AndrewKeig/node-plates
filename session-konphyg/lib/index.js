var _stores = require('../stores')
    , _konphyg = require('konphyg')('./config')
    , _session_konphyg = _konphyg('session')
    , _store = null
    , _day = 86400
    , _secret_code = '10101010101'
    , _session_key = 'express.sid'
    , _http_only = true
    , _path = '/';

exports.options = function () {
    return _session_konphyg;
}

exports.store = function () {
    return _store;
}

exports.configure_session = function () {
    _store = _stores.load(_session_konphyg);

    var secret = _session_konphyg.secret || _secret_code;
    var maxAge = _session_konphyg.maxAge ? new Date(Date.now() + _session_konphyg.maxAge) : _day;
    var session_key = _session_konphyg.sessionkey || _session_key;
    var httpOnly = _session_konphyg.httpOnly || _http_only;
    var path = _session_konphyg.path || _path;

    return { store: _store,
        cookie: { path: '/',
            httpOnly: httpOnly,
            maxAge: maxAge },
        secret: secret,
        key: session_key
    };
}
