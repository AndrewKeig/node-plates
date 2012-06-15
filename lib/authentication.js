var fs = require('fs');

exports.options = function(){
    return {
        key: fs.readFileSync('./authentication/server.key'),
        cert: fs.readFileSync('./authentication/server.crt'),
        ca: fs.readFileSync('./authentication/ca.crt'),
        requestCert: true,
        rejectUnauthorized: false
    };
};