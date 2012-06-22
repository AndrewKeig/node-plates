var fs = require('fs')
    ,path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')

exports.options = function(){
    return {
        key: fs.readFileSync(express_cfg.cert + 'server.key'),
        cert: fs.readFileSync(express_cfg.cert + 'server.crt'),
        ca: fs.readFileSync(express_cfg.cert + 'ca.crt'),
        requestCert: true,
        rejectUnauthorized: false,
        passphrase:'password'
    };
};