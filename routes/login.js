var   path = require('path')
    , konphyg = require('konphyg')(path.join(__dirname, '../config'))
    , express_cfg = konphyg('express')
    , api = require(express_cfg.api)
    , lib = require('../lib')
    , _ = require('underscore');

exports.get_login = function(req, res){
    console.log(' - get_login');
    var data = api.login.get();
    lib.templating.amend_json(data);
    res.format({
        json: function(){
            res.json(data);
        },
        html: function(){
            res.render('login', data);
        }
    })
};

exports.post_login = function(req, res){
    console.log(' - post_login: ' + req.body.user.username + '/' + req.body.user.password);

    lib.user.authenticate_user(req.body.user.username, req.body.user.password, function(err, user){
        if (user) {
            req.session.regenerate(function(){
                var data = api.login.get();
                lib.templating.amend_json(data);
                req.session.user = user;
                req.session.id = user.sessionId;
                res.redirect(lib.uri.getRedirect(data,"account"));
            });
        } else {
            var data = api.home.get();
            req.session.error = 'User details entered are not registered..';
            //res.redirect(lib.uri.getRedirect(data,"login"));
            console.log(' - get_login');
            var data = api.login.get();
            lib.templating.amend_json(data);
            data.errors.push({error: req.session.error});
            res.render('login', data);
        }
    })
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
};