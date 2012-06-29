exports.get = function(req, res){
    return  {
        title : "node plates - contact",
        contact : {
            email : "andrew.keig@gmail.com"
        },
        actions : [
            {
                rel: "Start",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Prev",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Me",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Next",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                domain: "https://nodeplates.airasoul.net",
                port: "",
                path: "account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                domain: "https://nodeplates.airasoul.net",
                port: "",
                path: "login",
                method : "POST",
                text : "login"
            },
            {
                rel: "Section",
                domain: "https://nodeplates.airasoul.net",
                port: "",
                path: "logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};