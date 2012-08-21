var crypto = require('crypto');
var path = require('path');
var errors = require(path.join(__dirname, '/errors'));

function is_valid_password (plain_text, hashed_password, salt) {
    return encrypt_password(plain_text, salt) === hashed_password;
};

function generate_salt () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

function encrypt_password (password, key) {
    return crypto.createHmac('sha1', key).update(password).digest('hex');
};

var salt = generate_salt();

var user = {
    andrew: {
        username: 'andrew',
        salt: salt,
        password: encrypt_password('keig', salt)
    }
}

var user_list = [];
user_list.push(user);

process.env['users'] = user_list;

exports.authenticate_user = function (username, password, next) {
    var users = process.env['users'];

    var util = require('util');
    console.log('--users ' + util.inspect(users));


    var user = users[username];


    if (user == null) {
        console.log('- user not found');
        return next(new errors.UserNotFound);
    }

    if (is_valid_password(password, user.password, user.salt)) {
        console.log('- valid user');
        return next(null, user);
    }

    console.log('- invalid password');
    next(new errors.InvalidPassword);
};

exports.register_user = function (user,  next) {

    var users = [];
    console.log('--users ' +users);

    var salt = generate_salt();

    var user = {
        andrew: {
            username: user.username,
            salt: salt,
            password: encrypt_password(user.password, salt)
        }
    }

    users.push(user);
    process.env['users'] = users;

    return next(null, user);
}