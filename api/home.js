exports.get = function(req, res){
    return  {
        title : "node plates - home",
        actions : [
            {
                url : "/login",
                method : "POST",
                label : "login"
            },
            {
                url : "/",
                method : "GET",
                label : "home"
            },
            {
                url : "/about",
                method : "GET",
                label : "about"
            },
            {
                url : "/github",
                method : "GET",
                label : "github"
            },
            {
                url : "/contact",
                method : "GET",
                label : "contact"
            },
            {
                url : "/account",
                method : "GET",
                label : "account"
            }
        ]
    }
};