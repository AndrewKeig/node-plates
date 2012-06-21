exports.get = function(req, res){
    return  {
        title : "node plates - contact",
        contact : {
            email : "andrew.keig@gmail.com"
        },
        actions : [
            {
                rel: "Start",
                href : "http://nodeplates.airasoul.nethome",
                method : "GET",
                text : "home"
            },
            {
                rel: "Prev",
                href : "http://nodeplates.airasoul.netabout",
                method : "GET",
                text : "about"
            },
            {
                rel: "Me",
                href : "http://nodeplates.airasoul.netcontact",
                method : "GET",
                text : "contact"
            },
            {
                rel: "Next",
                href : "http://nodeplates.airasoul.netgithub",
                method : "GET",
                text : "github"
            },
            {
                rel: "Section",
                href : "https://nodeplates.airasoul.netaccount",
                method : "GET",
                text : "account"
            },
            {
                rel: "Section",
                href : "https://nodeplates.airasoul.netlogin",
                method : "POST",
                text : "login"
            },
            {
                rel: "Section",
                href : "https://nodeplates.airasoul.netlogout",
                method : "POST",
                text : "logout"
            }
        ]
    }
};