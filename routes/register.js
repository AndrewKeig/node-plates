var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,lib = require('../lib')
    , _ = require('underscore');

exports.get_register = function(req, res){
    console.log(' - get_register');
    var data = api.register.get();
    lib.templating.amend_json(data);
    res.format({
        json: function(){
            res.json(data);
        },
        html: function(){
            res.render('register', data);
        }
    })
};

exports.post_register = function(req, res){
    console.log(' - post_register: ' + req.body.user.username + '/' + req.body.user.password + '/' + req.session.id);

    var reg_user = req.body.user;
    reg_user.sessionId = req.session.id;
    var data = api.register.get();
    lib.templating.amend_json(data);

    lib.user.register_user(reg_user, function(err, user){
        if (user) {
            req.session.regenerate(function(){
                req.session.user = user;
                res.redirect(lib.uri.getRedirect(data,"account"));
            });
        } else {
            req.session.error = 'registration failed';
            res.redirect(lib.uri.getRedirect(data,"register"));
        }
    })
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
};