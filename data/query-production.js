var util = require('util');
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());

exports.find_user_by_username = function (username, callback) {
    console.log(' - find by username: ' + username);

    var users = nStore.new('data/users.db', function () {
      users.find({username: username}, function (err, user) {
        console.log(' - user details: ' + util.inspect(user));
        if (user === undefined || user === null || user.length === 0) {
            callback(null, null);
            return;
        }
        else
        {
            callback(null, user[username]);
            return;
        }
      });
    });
    return;
}

exports.find_article_by_type = function (article_type, callback) {
    console.log(' - find article by article type: ' + article_type);
    var articles = nStore.new('data/articles.db', function () {
      articles.find({article_type: article_type}, function(err, article) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, article);
        return;
      });
    });

    return;
};