exports.get = function(req, res){
    return  {
        title : "node plates - home",
        articles : [],
        actions : [
            {
                rel: "Me",
                href : "http://nodeplates.airasoul.net/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Next",
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
                rel: "Section",
                href : "https://nodeplates.airasoul.net/login",
                method : "POST",
                text : "login"
            },
            {
                rel: "Section",
                href : "http://127.0.0.1:8443/logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};