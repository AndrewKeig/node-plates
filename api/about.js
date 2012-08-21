exports.get = function(req, res){
    return  {
        title : "node plates - about",
        actions : [
            {
                rel: "Start",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Me",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Next",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                domain: "https://127.0.0.1",
                port: ":8443",
                path: "account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "login",
                method : "GET",
                text : "login"
            },
            {
                rel: "Section",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "register",
                method : "GET",
                text : "register"
            },
            {
                rel: "Section",
                domain: "https://127.0.0.1",
                port: ":8443",
                path: "logout",
                method : "GET",
                text : "logout"
            }
        ]
    }
};