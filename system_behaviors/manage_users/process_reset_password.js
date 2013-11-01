var User = require('../../data_models/user').User
  , checkIfUser = require('./utilities').checkIfUser
  , sendError = require('../../utils/http').sendError
  , sendConfirmation = require('../../utils/http').sendConfirmation
  , sendEmail = require('../../systems/email').sendEmail
  , handlebars = require('handlebars')
  , pwResetTemplate = require('../../compiledEmails')(handlebars).pwReset;

module.exports = function (req, res) {
  var tempPw = Math.random().toString(36).slice(-8);
  var data = req.body;
  var config = {
    from: "kanesteven@gmail.com",
    to: data.email,
    subject: "Your temporary password from embercasts",
    html: pwResetTemplate ? pwResetTemplate({pw: tempPw}) : tempPw
  };
  
  User.findOnePromised({email: data.email})
  .then(checkIfUser)
  .then(function (user) {
    return user.changePropAndSavePromised("temporary_password", tempPw);
  })
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .then(function () {
    return config;
  })
  .then(sendEmail)
  .fail(function (err) {
    console.log(err.message);
  })
  .done();
};
