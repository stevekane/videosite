var _ = require('lodash')
  , Q = require('q');

var refreshSession = _.curry(function (req, user) {
  var loginPromise = Q.defer();

  console.log(user);

  req.logout();
  req.login(user, function (err) {
    if (err) {
      loginPromise.reject(new Error("Login Failed."));
    } else {
      loginPromise.resolve(user); 
    }
  });
  return loginPromise.promise;
});

module.exports = refreshSession;
