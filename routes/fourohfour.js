var konphyg = require('konphyg')('./config')
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api);


exports.index = function(req, res){
    res.format({
        html: function(){
            res.render('404');
        }
    })
};