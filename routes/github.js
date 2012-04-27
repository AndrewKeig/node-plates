var api = require('../api');

exports.index = function(req, res){
    res.format({
        json: function(){
            res.json(api.github.get());
        },
        html: function(){
            res.render('github', api.github.get());
        }
    })
};