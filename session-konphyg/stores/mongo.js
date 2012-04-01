exports.get = function (_session_konphyg) {
    var MongoStore = require('connect-mongo');
    return new MongoStore(_session_konphyg.db);
}