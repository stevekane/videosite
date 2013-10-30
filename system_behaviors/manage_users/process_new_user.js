var _ = require('lodash')
  , User = require('../../data_models/user').User
  , utilities = require('./utilities')
  , handleExistingUser = utilities.handleExistingUser
  , loginUser = utilities.loginUser
  , returnUser = utilities.returnUser
  , sendError = require('../../utils/http').sendError;

//delay execution till this is called in the promise chain
var createNewUser = function (hash) {
  return function () {
    return User.createPromised(hash);
  }
}

exports.processNewUser = _.curry(function (sendgrid, req, res) {
  var data = req.body;
  console.log(data);

  User.findOnePromised({email: data.email})
  .then(handleExistingUser)
  .then(createNewUser(data))
  .then(loginUser(req))
  //.then(sendSignupEmail(sendgrid))
  .then(returnUser(res))
  .fail(sendError(res))
  .done();
});
