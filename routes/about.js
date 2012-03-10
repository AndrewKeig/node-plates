var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.index = function(req, res){
    res.render('about', { title: content_cfg.title, logo: content_cfg.logo });
};