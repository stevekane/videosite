var sendError = require('../../utils/http').sendError
  , sanitizeUser = require('../../utils/http').sanitizeUser
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

      //for now we don't care if this fails
      sendEmail(emailData)

      return res.send({user: sanitizeUser(newUser)});
    });
  })
  .fail(sendError(res))
  .done();
}
