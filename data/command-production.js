var nStore = require('nstore');

exports.save_article = function (article, callback) {
    var articles = nStore.new('data/articles.db', function () {
      articles.save(null, article, function (err) {
        if (err) {
            console.log(' - fatal error saving article');
            callback(err);
            return;
        }
        callback(null);
        return;
      });
    });
}

exports.save_user = function (user, callback) {
    console.log(' - save user');
    var users = nStore.new('data/users.db', function () {
        console.log(' - creating nstore for users');
        users.save(user.username, user, function (err) {
        if (err) {
            console.log(' - fatal error saving user');
            callback(err);
            return;
        }
        console.log(' - user saved');
        callback(null);
        return;
      });
    });
}