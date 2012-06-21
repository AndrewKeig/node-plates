var konphyg = require('konphyg')('./config')
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api);


exports.index = function(req, res){
    res.format({
        json: function(){
            res.json(api.contact.get());
        },
        html: function(){
            res.render('contact', api.contact.get());
        }
    })
};