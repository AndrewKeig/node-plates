exports.get = function(req, res){
    return  {
        title : "node plates - account",
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
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                domain: "http://nodeplates.airasoul.net",
                port: "",
                path: "github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Me",
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
                path: "logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};