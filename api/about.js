exports.get = function(req, res){
    return  {
        title : "node plates - about",
        actions : [
            {
                rel: "Start",
                href : "/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Me",
                href : "/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Next",
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
                rel: "Section",
                href : "/account",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                href : "/login",
                method : "POST",
                text : "login"
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