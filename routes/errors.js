var lib = require('../lib');

exports.page_not_found = function(req, res){
    console.log('- error not found');
    res.statusCode = 404;
    res.end();
    return;
};