exports.get = function(req, res){
    return  {
        title : "node plates - account",
        actions : [
            {
                rel: "Start",
                domain: "http://nodeplates.airasoul.net",
                port: "8081",
                path: "home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "8081",
                path: "about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "8081",
                path: "contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "8081",
                path: "github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Me",
                domain: "https://nodeplates.airasoul.net",
                port: "8443",
                path: "account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                domain: "https://nodeplates.airasoul.net",
                port: "8443",
                path: "logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};