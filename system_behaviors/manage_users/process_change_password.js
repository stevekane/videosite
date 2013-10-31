var _ = require('lodash')
  , Q = require('q')
  , User = require('../../data_models/user').User
  , bcryptPromises = require('../../libs/bcrypt-promises')
  , comparePromised = bcryptPromises.comparePromised
  , hashPromised = bcryptPromises.hashPromised
  , returnUser = require('./utilities').returnUser
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../libs/email').sendEmail;

function checkIfMatches (isMatch) {
  if (!isMatch) { 
    throw new Error("Incorrect Password.");
  } 
  return isMatch;
}

module.exports = function (req, res) {
  var oldPw = req.body.oldpassword
    , newPw = req.body.password
    , user = req.user;

  User.findByIdPromised(user._id)
  .then(function (user) {
    comparePromised(oldPw, user.password)
    .then(checkIfMatches)
    .then(function () {
      return user.changePropAndSavePromised("password", newPw);
    })
    .then(returnUser(res))
    .fail(sendError(res))
    .done();
  })
  .fail(sendError(res))
  .done();
};
