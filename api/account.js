exports.get = function(req, res){
    return  {
        title : "node plates - account",
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
                rel: "Me",
                href : "https://127.0.0.1:8443/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                href : "https://127.0.0.1:8443/logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};