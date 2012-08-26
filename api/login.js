exports.get = function(req, res){
    return  {
        title : "node plates - login",
        errors : [],
        login : {
            domain: "https://127.0.0.1",
            port: ":8443",
            path: "login",
            method : "POST",
            username : { label : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { label : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
        },
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
                rel: "Section",
                domain: "http://127.0.0.1",
                port: ":8081",
                path: "about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
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
                path: "account",
                method : "GET",
                text : "account"
            }
        ]
    }
};