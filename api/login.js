exports.get = function(req, res){
    return  {
        title : "node plates - login",
        login : {
            href : "https://127.0.0.1:8443/login",
            method : "POST",
            username : { text : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { text : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
        },
        actions : [
            {
                rel: "Start",
                href : "/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Section",
                href : "/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                href : "/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                href : "/github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                href : "/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Me",
                href : "/login",
                method : "POST",
                text : "login"
            },
        ]
    }
};