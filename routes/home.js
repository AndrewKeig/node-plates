var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,article = require('../data/query.js')
    ,lib = require('../lib');

exports.index = function(req, res){
    var data = api.home.get();
    lib.templating.amend_json(data);

    article.find_article_by_type("News", function(err, articles){
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