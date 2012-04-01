var util = require('util');
var path = require('path');
var errors = require(path.join(__dirname, '/errors'));

exports.is_user_authenticated = function (req, res, next) {
    console.log('- is user logged in: ' + util.inspect(req.session));
    if (req.session.user) {
        next();
    } else {
        next(new errors.IsNotAuthenticated);
    }
};

exports.is_ajax = function (req, res, next) {
    console.log('Is ajax request : ' + req.xhr);
    if (req.xhr) {
        next();
    }
    else {
        next(new errors.IsNotAjaxRequest);
    }
};