var api = require('../api');
var article = require('../data/query.js');

exports.index = function(req, res){
    var data = api.home.get();

    article.find_article_by_type("News", function(err, articles){
        if (err) {
            console.log('- fatal error getting articles');
        }

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