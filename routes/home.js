var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,Lib = require(path.join(__dirname, '../lib'));

exports.index = function(req, res){
    var data = api.home.get();
    Lib.templating.amend_json(data);

    Lib.article.get_articles("News", function(err, articles){
        if (err) console.log('- fatal error getting articles');
        data.articles = articles;

        res.format({
            json: function(){
                res.json(data);
            },
            html: function(){
                res.render('home', data);
            }
        })
    });
};