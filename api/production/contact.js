exports.get = function(req, res){
    return  {
        title : "node plates - contact",
        contact : {
            email : "andrew.keig@gmail.com"
        },
        actions : [
            {
                rel: "Start",
                href : "http://nodeplates.airasoul.net/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Prev",
                href : "http://nodeplates.airasoul.net/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Me",
                href : "http://nodeplates.airasoul.net/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Next",
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
                href : "https://nodeplates.airasoul.net/logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};