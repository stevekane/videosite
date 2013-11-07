var _ = require('lodash')
  , Q = require('q');

function loginPromised (req, user) {
  var loginPromise = Q.defer();

  req.login(user, function (err) {
    loginPromise.resolve(user);
  });

  return loginPromise.promise;
}

module.exports.refreshSession = _.curry(function (req, user) {
  req.logout();
  return loginPromised(req, user);
});

module.exports.startSession = _.curry(function (req, user) {
  return loginPromised(req, user);
});

module.exports.verifyAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({
      message: "No user session found."
    });
  }
}
