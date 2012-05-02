exports.get = function(req, res){
    return  {
        title : "node plates - contact",
        actions : [
            {
                rel: "Start",
                href : "/home",
                method : "GET",
                text : "home"
            },
            {
                rel: "Prev",
                href : "/about",
                method : "GET",
                text : "about"
            },
            {
                rel: "Me",
                href : "/contact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Next",
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