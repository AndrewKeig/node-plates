var path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')
    ,api = require(express_cfg.api)
    ,templating = require(path.join(__dirname, '/templating'))
    ,_ = require('underscore');

exports.getRedirect = function (data, page) {
    templating.amend_json(data);

    var redirect = _.find(data.actions, function(action){
        return action.text === page; }
    );

    console.log(' - returning redirect %s for page, %s', redirect.page, page);

    return redirect.path;
}
