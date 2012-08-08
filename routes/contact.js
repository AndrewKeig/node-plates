var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,lib = require('../lib');


exports.index = function(req, res){
    var data = api.contact.get();
    lib.templating.amend_json(data);
    res.format({
        json: function(){
            res.json(data);
        },
        html: function(){
            res.render('contact', data);
        }
    })
};