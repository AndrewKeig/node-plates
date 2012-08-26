var util = require('util')
    , path = require('path')
    , uri = require(path.join(__dirname, '/uri'))
    , konphyg = require('konphyg')(path.join(__dirname, '../config'))
    , express_cfg = konphyg('express')
    , api = require(express_cfg.api);

exports.page_not_found_handler = function(err, req, res, next) {
    console.log(' - page_not_found_handler');
    if (err instanceof PageNotFound) {
        console.log(' - page not found');
        res.writeHeader(404);
        return;
    }
    next(err);
};

exports.internal_error_handler = function(req, res){
    console.log(' - internal_error_handler');
    res.writeHeader(500);
};

exports.uncaught_exception_handler = function (err, stack) {
    console.log(' - Caught exception: ' + err);
    console.log(' - ' + err.stack.split('\n'));
};

exports.invalid_password_handler = function(err, req, res, next) {
    console.log(' - invalid_password_handler');
    if (err instanceof InvalidPassword) {
        console.log(' - invalid password');
        req.session.error = 'Access denied!';
        var data = api.home.get();
        res.redirect(uri.getRedirect(data, "login"));
        return;
    }
    next(err);
};

exports.user_not_found_handler = function(err, req, res, next) {
    console.log(' - user_not_found_handler');
    if (err instanceof UserNotFound) {
        console.log(' - user not found');
        req.session.error = 'Access denied!';
        var data = api.home.get();
        res.redirect(uri.getRedirect(data, "login"));
        return;
    }
    next(err);
};

exports.user_not_authenticated_handler = function(err, req, res, next) {
       console.log(' - user_not_authenticated_handler');
       console.log(' - ' + err);
    if (err instanceof IsNotAuthenticated) {
        console.log(' - user not authenticated');
        req.session.error = 'Access denied!';
        var data = api.home.get();
        res.redirect(uri.getRedirect(data, "login"));
        return;
    }
    next(err);
};

exports.ajax_request_handler = function(err, req, res, next) {
    console.log(' - ajax_request_handler');
    if (err instanceof IsNotAjaxRequest) {
        console.log(' - request not ajax');
        res.writeHeader(404);
    }
    next(err);
};


function PageNotFound(msg) {
    this.name = 'PageNotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(PageNotFound, Error);
exports.PageNotFound = PageNotFound;

function UserNotFound(msg) {
    this.name = 'UserNotFound';
    this.description = 'The user details provided are not registered';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(UserNotFound, Error);

function UsernameTaken(msg) {
    this.name = 'UsernameTaken';
    this.description = 'The username provided is already in use';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

function InvalidPassword(msg) {
    this.name = 'InvalidPassword';
    this.description = 'The password provided is invalid';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(InvalidPassword, Error);

function IsNotAuthenticated(msg) {
    this.name = 'IsNotAuthenticated';
    this.description = 'The current session is not logged in';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotAuthenticated, Error);

function IsNotAjaxRequest(msg) {
    this.name = 'IsNotAjaxRequest';
    this.description = 'This is an ajax request';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotAjaxRequest, Error);

function InvalidUser(msg) {
    this.name = 'InvalidUser';
    this.description = 'The user details provided are not registered';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(InvalidUser, Error);

exports.IsNotAuthenticated = IsNotAuthenticated;
exports.IsNotAjaxRequest = IsNotAjaxRequest;
exports.UserNotFound = UserNotFound;
exports.InvalidUser = InvalidUser;
exports.InvalidPassword = InvalidPassword;
exports.UsernameTaken = UsernameTaken;