var sendError = require('../../utils/http').sendError
  , sendConfirmation = require('../../utils/http').sendConfirmation
  , sendEmail = require('../../systems/email').sendEmail
  , template = require('../../templates/emails').resetPassword
  , persistence = require('../../systems/persistence')
  , throwIfMissing = require('../../utils/promises').throwIfMissing;

/*
Parse out email from request body
Lookup user matching that email in persistence
Throw error if no user is found
Generate a random number that is 16 characters long
Save this as the user's temporary password
Build email template
Send email to user's email with the temporary password
Return confirmation
*/
module.exports = function (req, res) {
  var email = req.body.email;
    
  persistence.findOne("user", {email: email}) 
  .then(throwIfMissing("No user found with that email"))
  .then(function (user) {
    var tempPw = Math.random().toString(36);

    return persistence.updateById("user", user.id, {temporary_password: tempPw})
    .then(function (updatedUser) {
      var emailData = {
        to: updatedUser.email,
        from: "kanesteven@gmail.com",
        subject: "Your temporary password!",
        html: template ? template({password: tempPw}) : tempPw
      };
      return sendEmail(emailData)
      .then(sendConfirmation(res));
    })
  })
  .fail(sendError(res))
  .done();
}
