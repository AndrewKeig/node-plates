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
    console.log('- error ' + err);
    if (err instanceof IsNotLoggedIn) {
        console.log('- sending login form');
        res.partial('login', { title: content_cfg.title, logo: content_cfg.logo });
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


function PageNotFound(msg) {
    this.name = 'PageNotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(PageNotFound, Error);

function IsNotLoggedIn(msg) {
    this.name = 'IsNotLoggedIn';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotLoggedIn, Error);

function IsNotAjaxRequest(msg) {
    this.name = 'IsNotAjaxRequest';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
util.inherits(IsNotAjaxRequest, Error);

exports.PageNotFound = PageNotFound;
exports.IsNotLoggedIn = IsNotLoggedIn;
exports.IsNotAjaxRequest = IsNotAjaxRequest;
