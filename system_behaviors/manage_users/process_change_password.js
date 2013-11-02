var Q = require('q');
var userManager = require('../../systems/user_management')
  , compare = require('../../libs/bcrypt-promises').comparePromised
  , sendError = require('../../utils/http').sendError
  , utilities = require('./utilities')
  , returnUser = utilities.returnUser
  , checkIfUser = utilities.checkIfUser;

var comparePasswords = function (candidate, pw, tempPw) {
  var comparePromise = Q.defer(); 

  compare(candidate, pw)
  .then(function (pwMatches) {
    if (pwMatches) {
      comparePromise.resolve(true); 
    } 
    else {
      compare(candidate, tempPw)
      .then(function (tempPwMatches) {
        if (tempPwMatches) {
          comparePromise.resolve(true); 
        } 
        else {
          comparePromise.reject(new Error("Incorrect password.")); 
        }
      })
      .fail(function (err) {
        comparePromise.reject(err);
      })
    }
  })
  .fail(function (err) {
    comparePromise.reject(err); 
  });

  return comparePromise.promise;
}

/*
find the active user in the session
find their user model
if no user model, throw an error
check if their password (or temporary_password) matches
if it is a match, reset their temporary_password
set their new password
return the user
*/
module.exports = function (req, res) {
  var oldPw = req.body.oldpassword
    , newPw = req.body.password;

  userManager.findById(req.user.id || req.user._id)
  .then(checkIfUser)
  .then(function (user) {
    comparePasswords(oldPw, user.password, user.temporary_password)
    .then(function (isMatch) {
      var pwHash = {
        password: newPw,
        temporary_password: ""
      }
      return userManager.updateById(user.id, pwHash);
    })
    .then(returnUser(res))
    .fail(sendError(res))
  })
  .fail(sendError(res))
  .done();
};
