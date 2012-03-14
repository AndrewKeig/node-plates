exports.page_not_found = function(req, res){
    console.log('- error not found');
    throw new errors.PageNotFound;
};

exports.internal_error = function(req, res){
    console.log('- error');
    throw new errors.InternalError;
};