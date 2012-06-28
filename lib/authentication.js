var fs = require('fs')
    ,path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')

exports.options = function(){
    return {
        key: fs.readFileSync(express_cfg.cert),
        cert: fs.readFileSync(express_cfg.key),
        ca: fs.readFileSync(express_cfg.ca),
        requestCert: true,
        rejectUnauthorized: false,
        passphrase:'password'
    };
};