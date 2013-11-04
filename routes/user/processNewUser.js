var Q = require('q')
  , _ = require('lodash')
  , handlebars = require('handlebars')
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../systems/email').sendEmail
  , email = require('../../templates/emails')(handlebars).signup
  , userManager = require('../../systems/persistence')
  , callWithPromise = Q.ninvoke;

var throwIfUser = function (user) {
  if (user) {
    throw new Error("User already exists with that email"); 
  }
  return true;
}

/*
Parse out new user data from request
Build email template
Check if user by that email already exists
Return error stating "user already exists"
Create new User with provided data
Send email to their email address
Return new User object
*/
module.exports = function (req, res) {   
  var data = req.body;

  userManager.findOne("user", {email: data.email})
  .then(throwIfUser)
  .then(function () {
    return userManager.create("user", data)
    .then(function (newUser) {
      var emailData = {
        to: newUser.email,
        from: "kanesteven@gmail.com",
        subject: "Thanks for registering!",
        html: email ? email() : "Thanks!"
      };

      return sendEmail(emailData)
      .then(function () {
        return res.send({user: newUser});
      });
    })
  })
  .fail(sendError(res))
  .done();
}
