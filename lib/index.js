var path = require('path');

exports.errors = require(path.join(__dirname, '/errors'));
exports.middleware = require(path.join(__dirname, '/middleware'));
exports.templating = require(path.join(__dirname, '/templating'));
exports.authentication = require(path.join(__dirname, '/authentication'));
exports.article = require(path.join(__dirname, '/article'));
exports.uri = require(path.join(__dirname, '/uri'));

if (process.env['scale'] === 'true') {
    console.log('----1' + process.env['scale'] );
    exports.user = require(path.join(__dirname, '/user'));
} else {
    console.log('----2' + process.env['scale'] );
    exports.user = require(path.join(__dirname, '/memory_user'));
}