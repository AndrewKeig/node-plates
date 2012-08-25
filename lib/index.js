var path = require('path');

exports.errors = require(path.join(__dirname, '/errors'));
exports.middleware = require(path.join(__dirname, '/middleware'));
exports.templating = require(path.join(__dirname, '/templating'));
exports.authentication = require(path.join(__dirname, '/authentication'));
exports.article = require(path.join(__dirname, '/article'));
exports.uri = require(path.join(__dirname, '/uri'));
exports.user = require(path.join(__dirname, '/user'));