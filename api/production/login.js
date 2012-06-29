exports.get = function(req, res){
    return  {
        title : "node plates - login",
        login : {
            domain: "https://nodeplates.airasoul.net",
            port: "",
            path: "login",
            method : "POST",
            username : { label : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { label : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
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
                rel: "Section",
                domain: "https://nodeplates.airasoul.net",
                port: "",
                path: "account",
                method : "GET",
                text : "account"
            }
        ]
    }
};