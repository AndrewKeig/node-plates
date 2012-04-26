var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.get = function(req, res){
    return  {
        title: content_cfg.title

    };
};