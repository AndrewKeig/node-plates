var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var article = new Schema({
    author       : ObjectId
    , title      : String
    , body       : String
    , date       : Date
    , article_type  : String
});


var user = new Schema({
    sessionId: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});


mongoose.model('User', user);
mongoose.model('Article', article);
module.exports = mongoose;