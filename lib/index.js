var path = require('path');

exports.errors = require(path.join(__dirname, '/errors'));
exports.middleware = require(path.join(__dirname, '/middleware'));
exports.user = require(path.join(__dirname, '/user'));
exports.authentication = require(path.join(__dirname, '/authentication'));