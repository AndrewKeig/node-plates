var errors = require(__dirname + '/errors');
var util = require('util');

exports.IsUserLoggedIn = function (req, res, next) {
    console.log('- is user logged in: ' + util.inspect(req.session));
    if (req.session.user == null || req.session.user.sessionId == undefined) {
        next(new errors.IsNotLoggedIn);
    }
    else {
        next();
    }
};

exports.IsAjaxRequest = function (req, res, next) {
    console.log('Is ajax request : ' + req.xhr);
    if (!req.xhr) {
        next(new errors.IsNotAjaxRequest);
    }
    else {
        next();
    }
};