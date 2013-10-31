var _ = require('lodash')
  , Q = require('q')
  , User = require('../../data_models/user').User
  , utilities = require('./utilities')
  , handleExistingUser = utilities.handleExistingUser
  , refreshSession = require('../manage_sessions/refresh')
  , returnUser = utilities.returnUser
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../libs/email').sendEmail;

var changeEmailAndSave = _.curry(function (newEmail, user) {
  var savePromise = Q.defer();

  if (!user) {
    throw new Error("No user found matching your credentials!"); 
  }
  user.email = newEmail;
  user.savePromised()
  .then(function () {
    savePromise.resolve(user);
  })
  .fail(function (err) {
    savePromise.reject(err);
  })
  
  return savePromise.promise;
});

var processChangeEmail = _.curry(function (req, res) {
  var newData = req.body.user
    , user = req.user;

  User.findOnePromised({email: newData.email})
  .then(handleExistingUser)
  .then(function () { return User.findByIdPromised(user._id); })
  .then(changeEmailAndSave(newData.email))
  .then(refreshSession(req))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});

module.exports = processChangeEmail;
