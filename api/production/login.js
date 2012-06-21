exports.get = function(req, res){
    return  {
        title : "node plates - login",
        login : {
            href : "https://nodeplates.airasoul.net/login",
            method : "POST",
            username : { label : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { label : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
        },
        actions : [
            {
                rel: "Start",
                href : "http://nodeplates.airasoul.net/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Section",
                href : "http://nodeplates.airasoul.net/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                href : "http://nodeplates.airasoul.net/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                href : "http://nodeplates.airasoul.net/github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                href : "https://nodeplates.airasoul.net/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Me",
                href : "https://nodeplates.airasoul.net/login",
                method : "POST",
                text : "login"
            },
        ]
    }
};