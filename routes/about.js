var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.index = function(req, res){
    //content negotiation
    res.format({
        html: function(){
            res.render('about', { title: content_cfg.title});
        },

        text: function(){
            res.send(users.map(function(user){
                return ' - ' + user.name + '\n';
            }).join(''));
        },

        json: function(){
            res.json(users);
        }
    })

};