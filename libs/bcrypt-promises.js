var bcrypt = require('bcrypt')
  , _ = require('lodash')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

exports.comparePromised = function (candidate, current) {
  return callWithPromise(bcrypt, "compare", candidate, current);
};

exports.mustMatchPromised = function (candidate, current) {
  var matchPromise = Q.defer();

  callWithPromise(bcrypt, "compare", candidate, current)
  .then(function (isMatch) {
    if (isMatch) {
      matchPromise.resolve(true);
    } else {
      matchPromise.reject(new Error("No Match"));
    }
  })
  .fail(function (err) {
    console.log(err);
    matchPromise.reject(err); 
  });
 
  return matchPromise.promise;
}

exports.hashPromised = function (value, salt) {
  return callWithPromise(bcrypt, "hash", value, salt);
}
