var Article = require('./model').model('Article');

exports.save_article = function (article, callback) {
    var new_article = new Article();
    new_article.title = article.title;
    new_article.body = article.body;
    new_article.date = article.date;
    new_article.article_type  = article.article_type;

    new_article.save(function (err) {
        if (err) {
            console.log('- fatal error saving article');
        }
        callback();
        return;
    });
}