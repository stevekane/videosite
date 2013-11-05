var sendError = require('../../utils/http').sendError
  , returnByType = require('../../utils/http').returnByType;

/*
The current user is found at req.user
All we need to do is return this and we're golden
*/
module.exports = function (req, res) {
  var user = req.user;

  if (!user) {
    return sendError(res, new Error("No user found during login!"));
  } else {
    return returnByType(res, "user", user);  
  }
}
