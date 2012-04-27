exports.get = function(req, res){
    return  {
        title : "node plates - account",
        actions : [
            {
                url : "/logout",
                method : "POST",
                label : "logout"
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