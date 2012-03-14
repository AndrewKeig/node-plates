var util = require('util');
var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.not_found = function(req, res){
    console.log('- error not found');
    throw new errors.NotFound;
};

exports.internal_error = function(req, res){
    console.log('- error');
    throw new Error('An expected error');
};

exports.error_handler = function(err, req, res, next) {
    if (err instanceof InvalidPassword) {
        console.log('- invalid password');
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    if (err instanceof UserNotFound) {
        console.log('- user not found');
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    if (err instanceof IsNotAuthenticated) {
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    if (err instanceof IsNotAjaxRequest) {
        console.log('- request not ajax');
        next(err);
    }
    if (err instanceof PageNotFound) {
        console.log('- page not found');
        next(err);
    } else {
        next(err);
    }
};

function UserNotFound(msg) {
    this.name = 'UserNotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(UserNotFound, Error);

function InvalidPassword(msg) {
    this.name = 'InvalidPassword';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(InvalidPassword, Error);

function PageNotFound(msg) {
    this.name = 'PageNotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(PageNotFound, Error);

function IsNotAuthenticated(msg) {
    this.name = 'IsNotAuthenticated';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotAuthenticated, Error);

function IsNotAjaxRequest(msg) {
    this.name = 'IsNotAjaxRequest';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotAjaxRequest, Error);

exports.PageNotFound = PageNotFound;
exports.IsNotAuthenticated = IsNotAuthenticated;
exports.IsNotAjaxRequest = IsNotAjaxRequest;
exports.UserNotFound = UserNotFound;
exports.InvalidPassword = InvalidPassword;