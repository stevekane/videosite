var userManager = require('../../systems/user_management')
  , utilities = require('./utilities')
  , handleExistingUser = utilities.handleExistingUser
  , returnUser = utilities.returnUser
  , refreshSession = require('../manage_sessions/refresh')
  , sendError = require('../../utils/http').sendError;

module.exports = function (req, res) {
  var newEmail = req.body.user.email
    , user = req.user;

  //here we check if there is already a user by the new email
  User.findOnePromised({email: newEmail})
  .then(handleExistingUser)
  .then(function () { 
    return userManager.findByIdAndUpdate(user.id, {email: newEmail});
  })
  .then(refreshSession(req))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
};
