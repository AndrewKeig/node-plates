var Article = require('./model').model('Article');

exports.find_article_by_type = function (article_type, callback) {
    if (process.env['show_articles'] === 'false')
    {
        callback();
        return;
    }

    console.log(' - find by article type: ' + article_type);
    Article.find({article_type: article_type}, function(err, article) {
        if (err) {
            callback(err);
            return;
        }
        console.log(' - articles have %s found ', article == null ? 'not been' : 'been');
        //console.log(article);

        callback(null, article);
        return;
    });

    callback(null, null);
    return;
};