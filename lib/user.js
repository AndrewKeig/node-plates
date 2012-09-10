var crypto = require('crypto');
var path = require('path');
var util = require('util');
var errors = require(path.join(__dirname, '/errors'));
var enquire = require('enquire');
var query = enquire.load(path.join(__dirname, '../data/query'));
var command = enquire.load(path.join(__dirname, '../data/command'));

function encrypt_password (password) {
    var salt = '01010000101010';
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

exports.register_user = function (user,  next) {
    console.log(' - register user ');
    query.find_user_by_username(user.username, function(err, found_user) {
        if (err) {
            next(err);
            return;
        }

        console.log(' - found user  : %s', util.inspect(found_user));

        if (found_user !== undefined && found_user !== null && found_user.length !== 0) {
            console.log(' - username already taken');
            next(new errors.UsernameTaken);
            return;
        }
        else
        {
            user.password = encrypt_password(user.password);

            command.save_user(user, function (err) {
                if (err) {
                    console.log(' - unable to save user');
                    next(new errors.InvalidUser);
                }
                next(null, user);
                return;
            });
        }
    });
};

exports.authenticate_user = function (username, password, next) {

    console.log(' - user name' + username);
    console.log(' - user password' + password);

    query.find_user_by_username(username, function(err, user) {
        if (err) {
            next(err);
            return;
        }

        if (user === undefined || user === null || user.length === 0) {
            console.log(' - user not found');
            next(new errors.UserNotFound);
            return;
        }

        password = encrypt_password(password);

        console.log(' - user details: ' + util.inspect(user));
        console.log(' - saved user password' + user);

        if (user.password !== password)
        {
            console.log(' - invalid password');
            next(new errors.InvalidPassword);
            return;
        }

        return next(null, user);
   });
};