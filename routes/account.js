var api = require('../api');

exports.index = function(req, res){
    res.format({
        json: function(){
            res.json(api.account.get());
        },
        html: function(){
            res.render('account', api.account.get());
        }
    })
};