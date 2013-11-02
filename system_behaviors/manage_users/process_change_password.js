var User = require('../../data_models/user').User
  , returnUser = require('./utilities').returnUser
  , checkIfUser = require('./utilities').checkIfUser
  , sendError = require('../../utils/http').sendError;

//NOTE: if we are changing password, we should reset temporary_password
module.exports = function (req, res) {
  var oldPw = req.body.oldpassword
    , newPw = req.body.password;

  //pull the id off the currently logged in user
  User.findByIdPromised(req.user._id)
  .then(checkIfUser)
  .then(function (user) {

    user.matchPasswordOrTemporaryPromised(oldPw)
    .then(function () {
      return user.changePropAndSavePromised("password", newPw);
    })
    .then(function () {
      return user.changePropAndSavePromised("temporary_password", "");
    })
    .then(returnUser(res))
    .fail(sendError(res))
    .done();
  })
  .fail(sendError(res))
  .done();
};
