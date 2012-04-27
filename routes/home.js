var api = require('../api');

exports.index = function(req, res){
    res.format({
        json: function(){
            res.json(api.home.get());
        },
        html: function(){
            res.render('index', api.home.get());
        }
    })
};