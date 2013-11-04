var sendError = require('../../utils/http').sendError
  , returnByType = require('../../utils/http').returnByType
  , sendEmail = require('../../systems/email').sendEmail
  , template = require('../../templates/emails').changeEmail
  , persistence = require('../../systems/persistence');

var throwIfUser = function (user) {
  if (user) {
    throw new Error("User already exists with that email"); 
  }
  return true;
}

/*
Parse out change data from request
Check if a user already exists with the new email
Return error stating "User already exists"
Find user with current email
Return error if none exists "User doesn't exist"
Update user information with new email
Build email template
Send email to their new email address
Return updated User object
*/
module.exports = function (req, res) {
  var data = req.body;

  persistence.findOne("user", {email: data.newEmail})
  .then(throwIfUser)
  //TODO: The user.id could probably be taken from the session directly
  //this would save this somewhat pointless persistence lookup
  .then(function () {
    return persistence.findOne("user", {email: data.email});
  })
  .then(function (user) {
    return persistence.updateById("user", user.id, {email: data.newEmail})
    .then(function (updatedUser) {
      var emailData = {
        to: updatedUser.email,
        from: "kanesteven@gmail.com",
        subject: "You changed your email!",
        html: template ? template() : "So email.  Many wow."
      };

      return sendEmail(emailData)
      .then(function () {
        return returnByType(res, "user", updatedUser);
      });
    })
  })
  .fail(sendError(res))
  .done();
}
