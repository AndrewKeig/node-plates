exports.get = function (_session_konphyg) {
    var express = require('express');
    return new express.session.MemoryStore({ reapInterval: _session_konphyg.reapInterval});
}