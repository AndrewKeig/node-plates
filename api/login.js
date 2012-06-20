exports.get = function(req, res){
    return  {
        title : "node plates - login",
        login : {
            href : "https://127.0.0.1:8443/login",
            method : "POST",
            username : { label : "username", name : "user[username]", placeholder: "Please enter a username"},
            password : { label : "password", name : "user[password]", placeholder: "Please enter a password"},
            button : { name: "login"}
        },
        actions : [
            {
                rel: "Start",
                href : "http://127.0.0.1:8080/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Section",
                href : "http://127.0.0.1:8080/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                href : "http://127.0.0.1:8080/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                href : "http://127.0.0.1:8080/github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                href : "https://127.0.0.1:8443/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Me",
                href : "https://127.0.0.1:8443/login",
                method : "POST",
                text : "login"
            },
        ]
    }
};