var fs = require('fs')
    ,path = require('path')
    ,konphyg = require('konphyg')(path.join(__dirname, '../config'))
    ,express_cfg = konphyg('express')

exports.options = function(){
    console.log('details');
    console.log(express_cfg.cert);
    console.log(express_cfg.key);
    console.log(express_cfg.ca);
    return {
        key: fs.readFileSync(express_cfg.key),
        cert: fs.readFileSync(express_cfg.cert),
        ca: fs.readFileSync(express_cfg.ca),
        requestCert: true,
        rejectUnauthorized: false,
        passphrase:'password'
    };
};