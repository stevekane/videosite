var sendError = require('../../utils/http').sendError
  , returnByType = require('../../utils/http').returnByType
  , throwIfFound = require('../../utils/promises').throwIfFound
  , startSession = require('../../utils/session').startSession
  , sendEmail = require('../../systems/email').sendEmail
  , template = require('../../templates/emails').signup
  , persistence = require('../../systems/persistence');

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
  .then(throwIfFound("User already exists with that email"))
  .then(function () {
    return persistence.create("user", data)
    .then(startSession(req))
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
