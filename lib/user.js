var crypto = require('crypto');
var path = require('path');
var errors = require(path.join(__dirname, '/errors'));

var query = require('../data/query.js');
var command = require('../data/command.js');

function encrypt_password (password) {
    var salt = '01010000101010';
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};


exports.register_user = function (user,  next) {
    console.log(' - register user ' + user.username);
    query.find_user_by_username(user.username, function(err, found_user) {
        if (err) {
            next(err);
            return;
        }

        if (found_user !== null) {
            console.log(' - username already taken');
            next(new errors.UsernameTaken);
            return;
        }

        user.password = encrypt_password(user.password);

        command.save_user(user, function (err) {
            if (err) {
                console.log(' - unable to save user');
                next(new errors.InvalidUser);
            }
            next(null, user);
            return;
        });
    });
};

exports.authenticate_user = function (username, password, next) {
    query.find_user_by_username(username, function(err, user) {
        if (err) {
            next(err);
            return;
        }

        if (user == null) {
            console.log(' - user not found');
            next(new errors.UserNotFound);
            return;
        }

        password = encrypt_password(password);

        if (user.password !== password)
        {
            console.log(' - invalid password');
            next(new errors.InvalidPassword);
            return;
        }

        return next(null, user);
   });
};