var formatUser = require('../../data_models/utilities').formatWithKey("user")

module.exports = function (req, res) {
  if (req.user && req.isAuthenticated()) {
    return res.status(200).json(formatUser(req.user)); 
  } else {
    return res.send(204);
  }
}
