var userManager = require('../../systems/user_management') 
  , utilities = require('./utilities')
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../systems/email').sendEmail
  , handlebars = require('handlebars')
  , signupTemplate = require('../../compiledEmails')(handlebars).signup;

var processNewUser = function (req, res) {
  var data = req.body;
  var config = {
    from: "kanesteven@gmail.com",
    to: data.email,
    subject: "Welcome to embercasts!",
    html: signupTemplate ? signupTemplate() : "Welcome!"
  };

  userManager.findOne({email: data.email})
  .then(utilities.handleExistingUser)
  .then(function () {
    return userManager.create(data);
  })
  .then(utilities.loginUser(req))
  .then(utilities.returnUser(res))
  .fail(sendError(res))
  .then(function () {
    return config;
  })
  .then(sendEmail)
  .done();
};

module.exports = processNewUser;
