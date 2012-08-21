var Article = require('./model').model('Article');
var User = require('./model').model('User');

exports.find_user_by_username = function (username, callback) {
    console.log(' - find by username: ' + username);
    User.findOne({username:username}, function(err, user) {
        if (err) {
            callback(err);
            return;
        }

        console.log(' - user have %s found ', user == null ? 'not been' : 'been');

        callback(null, user);
        return;
    });
}

exports.find_article_by_type = function (article_type, callback) {
    console.log(' - find article by article type: ' + article_type);
    Article.find({article_type: article_type}, function(err, article) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(' - articles have %s found ', article == null ? 'not been' : 'been');

        callback(null, article);
        return;
    });

    return;
};