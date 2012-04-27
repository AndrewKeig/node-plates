var api = require('../api');

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