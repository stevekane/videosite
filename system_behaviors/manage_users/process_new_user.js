var _ = require('lodash')
  , User = require('../../data_models/user').User
  , utilities = require('./utilities')
  , handleExistingUser = utilities.handleExistingUser
  , loginUser = utilities.loginUser
  , returnUser = utilities.returnUser
  , sendError = require('../../utils/http').sendError
  , sendEmail = require('../../libs/email').sendEmail;

//delay execution till this is called in the promise chain
var createNewUser = function (hash) {
  return function () {
    return User.createPromised(hash);
  }
}

var processNewUser = _.curry(function (sendgrid, emailTemplate, req, res) {
  var data = req.body;
  var config = {
    from: "kanesteven@gmail.com",
    to: data.email,
    subject: "Welcome to embercasts!",
    html: emailTemplate()
  };

  User.findOnePromised({email: data.email})
  .then(handleExistingUser)
  .then(createNewUser(data))
  .then(loginUser(req))
  .then(function () { return config; })
  .then(sendEmail(sendgrid))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});

module.exports = processNewUser;
