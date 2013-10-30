var formatUser = require('../../data_models/utilities').formatWithKey("user")

var login = function (req, res) {
  return res.json(formatUser(req.user));
}

module.exports = login;
