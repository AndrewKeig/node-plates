var api = require('../api');

exports.index = function(req, res){
    res.format({
        html: function(){
            res.render('404');
        }
    })
};