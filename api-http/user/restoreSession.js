var returnByType = require('../../utils/http').returnByType;

module.exports = function (req, res) {
  if (req.user && req.isAuthenticated()) {
    return returnByType(res, "user", req.user);
  } else {
    return res.send(204);
  }
}
