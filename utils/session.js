var _ = require('lodash')
  , Q = require('q');

module.exports.refreshSession = _.curry(function (req, user) {
  req.logout();
  //we attempt to login but don't care if it fails
  //worse case, they will need to login again
  req.login(user);
  return user;
});

module.exports.startSession = _.curry(function (req, user) {
  var loginPromise = Q.defer();

  //TODO: this is probably wrong.  If login fails we should probably
  //reject the promise and deal w/ it in the calling code..
  req.login(user, function (err) {
    loginPromise.resolve(user);
  });

  return loginPromise.promise;
});

module.exports.verifyAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).send({
      message: "No user session found."
    });
  }
}
