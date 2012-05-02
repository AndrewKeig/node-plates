exports.get = function(req, res){
    return  {
        title : "node plates - account",
        actions : [
            {
                rel: "Start",
                href : "/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Section",
                href : "/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Section",
                href : "/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Section",
                href : "/github",
                method : "GET",
                text : "github"
            },
            {
                rel: "Me",
                href : "/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                href : "/logout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};