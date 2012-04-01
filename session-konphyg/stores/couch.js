exports.get = function (_session_konphyg) {
    var express = require('express');
    var ConnectCouchDB = require('connect-couchdb')(express);
    return new ConnectCouchDB(_session_konphyg.db);
}