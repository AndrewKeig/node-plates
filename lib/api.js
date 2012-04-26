var konphyg = require('konphyg')('./config');
var content_cfg = konphyg('content');

exports.get = function(req, res){
    return  {
        title : content_cfg.title,
        login : {
            url : "/login",
            method : "POST",
            username : { label : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { label : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
        },
        actions : [
            {
                url : "/login",
                method : "POST",
                label : "login"
            },
            {
                url : "/",
                method : "GET",
                label : "home"
            },
            {
                url : "/about",
                method : "GET",
                label : "about"
            },
            {
                url : "/github",
                method : "GET",
                label : "github"
            },
            {
                url : "/contact",
                method : "GET",
                label : "contact"
            },
            {
                url : "/account",
                method : "GET",
                label : "account"
            }
        ]
    }
};