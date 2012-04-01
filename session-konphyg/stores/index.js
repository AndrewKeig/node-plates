var path = require('path');

exports.load = function (_session_konphyg) {
  try {
      var store_path = path.join(__dirname, _session_konphyg.session_type);
      var store = require(store_path);
      return store.get(_session_konphyg);
  } catch(err) {
    throw new Error('Error finding config for session ' + store_path);
  }
}