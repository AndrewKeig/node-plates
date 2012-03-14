var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');
var lib = require('../lib');

exports.get_login = function(req, res){
    res.render('login', { title: content_cfg.title});
};

exports.post_login = function(req, res){
    console.log('post_login: ' + req.body.user.username + '/' + req.body.user.password);
    lib.user.authenticate_user(req.body.user.username, req.body.user.password, function(err, user){
        if (user) {
            req.session.regenerate(function(){
                req.session.user = user;
                res.redirect('/channels');
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