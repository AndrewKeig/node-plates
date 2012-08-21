var Article = require('./model').model('Article');
var User = require('./model').model('User');

exports.save_article = function (article, callback) {
    var new_article = new Article();
    new_article.title = article.title;
    new_article.body = article.body;
    new_article.date = article.date;
    new_article.article_type  = article.article_type;

    new_article.save(function (err) {
        if (err) {
            console.log(' - fatal error saving article');
            callback(err);
            return;
        }
        callback(null);
        return;
    });
}

exports.save_user = function (user, callback) {
    var new_user = new User();
    new_user.sessionId = user.sessionId;
    new_user.username = user.username;
    new_user.password = user.password;

    new_user.save(function (err) {
        if (err) {
            console.log(' - fatal error saving user');
            callback(err);
            return;
        }
        callback(null);
        return;
    });
}