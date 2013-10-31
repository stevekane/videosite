var _ = require('lodash')
  , User = require('../../data_models/user').User
  , checkIfUser = require('./utilities').checkIfUser
  , sendError = require('../../utils/http').sendError
  , sendConfirmation = require('../../utils/http').sendConfirmation
  , sendEmail = require('../../libs/email').sendEmail;

module.exports = _.curry(function (sendgrid, emailTemplate, req, res) {
  var tempPw = Math.random().toString(36).slice(-8);
  var data = req.body;
  var config = {
    from: "kanesteven@gmail.com",
    to: data.email,
    subject: "Your temporary password from embercasts",
    html: emailTemplate ? emailTemplate({pw: tempPw}) : tempPw
  };
  
  User.findOnePromised({email: req.body.email})
  .then(checkIfUser)
  .then(function (user) {
    return user.changePropAndSavePromised("temporary_password", tempPw);
  })
  .then(sendConfirmation(res))
  .fail(sendError(res))
  .then(function () { return config; })
  .then(sendEmail(sendgrid))
  .done();
});
