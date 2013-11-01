var User = require('../../data_models/user').User
  , utilities = require('./utilities')
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../systems/email').sendEmail
  , newUserTemplate = require('../../compiledEmails').signup;

var processNewUser = function (req, res) {
  var data = req.body;
  var config = {
    from: "kanesteven@gmail.com",
    to: data.email,
    subject: "Welcome to embercasts!",
    html: emailTemplate ? emailTemplate() : "Welcome!"
  };

  User.findOnePromised({email: data.email})
  .then(utilities.handleExistingUser)
  .then(function () {
    return User.createPromised(data);
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
