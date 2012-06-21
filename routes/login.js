var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,lib = require('../lib');

exports.get_login = function(req, res){
    res.format({
        json: function(){
            res.json(api.login.get());
        },
        html: function(){
            res.render('login', api.login.get());
        }
    })
};

exports.post_login = function(req, res){
    console.log('post_login: ' + req.body.user.username + '/' + req.body.user.password);
    lib.user.authenticate_user(req.body.user.username, req.body.user.password, function(err, user){
        if (user) {
            req.session.regenerate(function(){
                req.session.user = user;
                res.redirect('/account');
            });
        } else {
            req.session.error = 'Authentication failed';
            res.redirect('/login');
        }
    })
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
};