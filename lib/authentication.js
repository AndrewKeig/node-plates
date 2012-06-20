var fs = require('fs');

exports.options = function(){
    return {
        key: fs.readFileSync('./auth/server.key'),
        cert: fs.readFileSync('./auth/server.crt'),
        ca: fs.readFileSync('./auth/ca.crt'),
        requestCert: true,
        rejectUnauthorized: false,
        passphrase:password
    };
};