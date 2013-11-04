var sendError = require('../../utils/http').sendError
  , returnByType = require('../../utils/http').returnByType
  , template = require('../../templates/emails').changeEmail
  , persistence = require('../../systems/persistence')
  , compareMultiple = require('../../libs/bcrypt-promises').compareMultiplePromised
  , throwIfFound = require('../../utils/promises').throwIfFound
  , throwIfMissing = require('../../utils/promises').throwIfMissing;

/*
Parse out change data from request
Find the user by their id
Throw is the user is not found
Compare both the password and temporary_password of the user to old password 
If either matches, set temporary_password to "" and password to new password
Return updated User object
*/
module.exports = function (req, res) {
  var data = req.body
    , oldPw = req.body.oldpassword
    , newPw = req.body.password;

  //TODO: this should either find an id on the session
  //or on the request body...atm accounting for either
  //persistance.findById("user", req.user.id)
  persistence.findById("user", data.id)
  .then(throwIfMissing("No user found"))
  .then(function (user) {
    return compareMultiple(user.password, user.temporary_password, oldPw)
    .then(function () {
      var changes = {
        password: newPw,
        temporary_password: ""
      };
      return persistence.updateById("user", user.id, changes)
      .then(function (updatedUser) {
        return returnByType(res, "user", updatedUser);
      })
    })
  })
  .fail(sendError(res))
  .done()
}
