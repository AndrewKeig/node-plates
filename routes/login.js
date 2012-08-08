var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,lib = require('../lib');

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

    var data = api.login.get();

    lib.user.authenticate_user(req.body.user.username, req.body.user.password, function(err, user){
        if (user) {
            req.session.regenerate(function(){
                req.session.user = user;
                res.redirect('/account');
            });
        } else {
            req.session.error = 'Authentication failed';
            //res.redirect('/login');
            res.redirect(data.actions.where(text = login).path);
        }
    })
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
};