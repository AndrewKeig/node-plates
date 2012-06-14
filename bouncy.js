var bouncy = require('bouncy');

bouncy(function (req, bounce) {
    if (req.headers.host === 'nodeplates.airasoul.net') {
        bounce(8001);
    }
    else if (req.headers.host === 'boxhop.airasoul.net') {
        bounce(8002);
    }
}).listen(8000);