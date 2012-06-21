var util = require('util');

exports.uncaught_exception = function (err, stack) {
    console.log('Caught exception: ' + err);
    console.log(err.stack.split('\n'));
};

exports.page_not_found_handler = function(req, res){
    res.render('404');
};

exports.internal_error_handler = function(req, res){
    res.render('500');
};

exports.invalid_password_handler = function(err, req, res, next) {
    console.log('invalid_password_handler');
    if (err instanceof InvalidPassword) {
        console.log('- invalid password');
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    next(err);
};

exports.user_not_found_handler = function(err, req, res, next) {
    console.log('user_not_found_handler');
    if (err instanceof UserNotFound) {
        console.log('- user not found');
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    next(err);
};

exports.user_not_authenticated_handler = function(err, req, res, next) {
       console.log('user_not_authenticated_handler');
        console.log(err);
    if (err instanceof IsNotAuthenticated) {
        console.log('- user not auth');
        req.session.error = 'Access denied!';
        res.redirect('/login');
        return;
    }
    console.log('- next');
    next(err);
};

exports.ajax_request_handler = function(err, req, res, next) {
    console.log('ajax_request_handler');
    if (err instanceof IsNotAjaxRequest) {
        console.log('- request not ajax');
        res.redirect('/404');
    }
    next(err);
};

exports.page_not_found_handler = function(err, req, res, next) {
    console.log('page_not_found_handler');
    if (err instanceof PageNotFound) {
        console.log('- page not found');
        res.redirect('/404');
    }
    next(err);
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