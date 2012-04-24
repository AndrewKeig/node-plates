var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.index = function(req, res){
    var api = { title: content_cfg.title };

    res.format({
        json: function(){
            res.json(api);
        },
        html: function(){
            res.render('about', api);
        }
    })
};