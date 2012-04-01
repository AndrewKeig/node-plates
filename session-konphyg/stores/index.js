exports.load = function (_session_konphyg) {
  try {
      var store = require('./' + _session_konphyg.session_type);
      return store.get(_session_konphyg);
  } catch(err) {
    throw new Error('Error finding config for session ' + _session_konphyg.session_type);
  }
}