var data = require('../data/command.js');

exports.save = function(req, res){
    console.log(JSON.stringify(req.body));

    var now = new Date();
    var jsonDate = now.toJSON();

    var article = {};
    article.title = req.body.title;
    article.body = req.body.body;
    article.date = jsonDate;
    article.article_type  = req.body.article_type;

    data.save_article(article, function(err){
        if (err) {
            console.log('- fatal error saving article');
        }

        console.log('- saved article');
        res.send("Done");
    });
};

exports.populate = function(req, res){
    for (i=1; i<5; i++)
    {
        var now = new Date();
        var jsonDate = now.toJSON();

        var article = {};
        article.title = "asdasd";
        article.body = "asdasdasd";
        article.date = jsonDate;
        article.article_type  = "News";

        data.save_article(article, function(err){
            if (err) {
                console.log('- fatal error saving article');
            }

            console.log('- saved article');
            res.send("Done");
        });
    }
};