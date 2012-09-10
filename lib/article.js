//var data = require('../data/command.js');
//var query = require('../data/query.js');

var path = require('path');
var util = require('util');
var enquire = require('enquire');
var query = enquire.load(path.join(__dirname, '../data/query'));
var command = enquire.load(path.join(__dirname, '../data/command'));


exports.save = function(req, res){
    var now = new Date();
    var jsonDate = now.toJSON();

    var article = {};
    article.title = req.body.title;
    article.body = req.body.body;
    article.date = jsonDate;
    article.article_type  = req.body.article_type;

    command.save_article(article, function(err){
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

        command.save_article(article, function(err){
            if (err)
                console.log(' - fatal error saving article');
        });
    }
};


exports.get_articles = function (article_type, callback) {
    if (process.env['show_content'] === 'false')
    {
        callback(null, null);
        return;
    }

    console.log(' - find article by article type: ' + article_type);
    query.find_article_by_type(article_type, function(err, article) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(' - articles have %s found ',
            (article === null && article.length === 0) ? 'not been' : 'been');

        var articles = [];
        for(item in article){
            articles.push(article[item]);
        }

        console.log(' - articles %s', util.inspect(article));

        callback(null, articles);
        return;
    });

    return;
};