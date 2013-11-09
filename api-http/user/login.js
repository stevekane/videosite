var sendError = require('../../utils/http').sendError
  , sanitizeUser = require('../../utils/http').sanitizeUser;

/*
The current user is found at req.user
All we need to do is return this and we're golden
*/
module.exports = function (req, res) {
  var user = req.user;

  if (!user) {
    return sendError(res, new Error("No user found during login!"));
  } else {
    return res.send({user: sanitizeUser(user)});
  }
}
