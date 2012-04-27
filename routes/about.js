var api = require('../api');

exports.index = function(req, res){
    res.format({
        json: function(){
            res.json(api.about.get());
        },
        html: function(){
            res.render('about', api.about.get());
        }
    })
};