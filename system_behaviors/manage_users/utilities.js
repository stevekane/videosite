var _ = require('lodash')
  , Q = require('q')
  , formatUser = require('../../data_models/utilities').formatWithKey("user");

//We use a Q.defer here to allow us to throw or resolve the callback from login
var loginUser = _.curry(function (req, user) {
  var loginPromise = Q.defer();

  req.login(user, function (err) {
    if (err) {
      loginPromise.reject(new Error("Login Unsuccessful."));
    } else {
      loginPromise.resolve(user); 
    }
  });
  return loginPromise.promise;
});

//throw if there is an existing user else return null
var handleExistingUser = function (user) {
  if (user) { 
    throw new Error("User already exists!");
  }
  return null;
}

var returnUser = _.curry(function (res, user) {
  res.json(formatUser(user));
});

module.exports = {
  loginUser: loginUser,
  handleExistingUser: handleExistingUser,
  returnUser: returnUser
}
