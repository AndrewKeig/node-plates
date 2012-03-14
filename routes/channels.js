var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.index = function(req, res){
    res.render('channels', { title: content_cfg.title });
};