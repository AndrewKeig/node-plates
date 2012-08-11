var data = require('../data/command.js');

exports.save = function(req, res){
    var now = new Date();
    var jsonDate = now.toJSON();

    var article = {};
    article.title = req.body.title;
    article.body = req.body.body;
    article.date = jsonDate;
    article.article_type  = req.body.article_type;

    data.save_article(article, function(err){
        if (err)
            console.log(' - fatal error saving article');
        else
            console.log(' - saved article');
    });
};

exports.populate = function(req, res){
    for (i=1; i<5; i++)
    {
        var now = new Date();
        var jsonDate = now.toJSON();
        var article = {};
        article.title = "Article " + i;
        article.body = "This article exists in order to demonstrate mongodb via mongoose..";
        article.date = jsonDate;
        article.article_type  = "News";

        data.save_article(article, function(err){
            if (err)
                console.log(' - fatal error saving article');
        });
    }
};