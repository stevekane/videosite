var sendError = require('../../utils/http').sendError
  , returnByType = require('../../utils/http').returnByType
  , sendEmail = require('../../systems/email').sendEmail
  , template = require('../../templates/emails').signup
  , persistence = require('../../systems/persistence');

var throwIfUser = function (user) {
  if (user) {
    throw new Error("User already exists with that email"); 
  }
  return true;
}

/*
Parse out new user data from request
Check if user by that email already exists
Return error stating "user already exists"
Create new User with provided data
Build email template
Send email to their email address
Return new User object
*/
module.exports = function (req, res) {   
  var data = req.body;

  persistence.findOne("user", {email: data.email})
  .then(throwIfUser)
  .then(function () {
    return persistence.create("user", data)
    .then(function (newUser) {
      var emailData = {
        to: newUser.email,
        from: "kanesteven@gmail.com",
        subject: "Thanks for registering!",
        html: template ? template() : "Thanks!"
      };

      return sendEmail(emailData)
      .then(function () {
        return returnByType(res, "user", newUser);
      });
    });
  })
  .fail(sendError(res))
  .done();
}
