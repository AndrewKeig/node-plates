var fs = require('fs');

exports.options = function(req, res){
    return {
        key: fs.readFileSync('./Authentication/server.key'),
        cert: fs.readFileSync('./Authentication/server.crt'),
        ca: fs.readFileSync('./Authentication/ca.crt'),
        requestCert: true,
        rejectUnauthorized: false
    };
};