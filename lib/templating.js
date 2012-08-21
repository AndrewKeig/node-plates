var _ = require('underscore');

exports.amend_json = function (data) {
    if (process.env['scale'] === 'false') {
        //for(item in data.actions){
        //    if (data.actions[item].path === "login"
        //        || data.actions[item].path === "logout"
        //        || data.actions[item].path === "account"
        //        || data.actions[item].path === "register"){
        //        data.actions[item] = null;
        //    }
        // }

        data = _.reject(data.actions, function(link){
            return link == null });
    }

    data.rendered = 'true';

    if (process.env['template_delivery'] === 'server')
        return;

    data.rendered = 'false';

    for(item in data.actions){
        if (data.actions[item].path != "logout" && data.actions[item].path != "account")
            data.actions[item].path = "views/" + data.actions[item].path + ".html";
    }
};