var User = require('../../data_models/user').User
  , utilities = require('./utilities')
  , handleExistingUser = utilities.handleExistingUser
  , refreshSession = require('../manage_sessions/refresh')
  , returnUser = utilities.returnUser
  , sendError = require('../../utils/http').sendError;

module.exports = function (req, res) {
  var email = req.body.user.email
    , user = req.user;

  User.findOnePromised({email: email})
  .then(handleExistingUser)
  .then(function () { 
    return User.findByIdPromised(user._id); 
  })
  .then(function (user) {
    return user.changePropAndSavePromised("email", email);
  })
  .then(refreshSession(req))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
};
