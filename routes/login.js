var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.get_login = function(req, res){
    res.render('login', { title: content_cfg.title, logo: content_cfg.logo });
};

exports.post_login = function(req, res){
    res.partial('message', { title: content_cfg.title, logo: content_cfg.logo, message: message });
};