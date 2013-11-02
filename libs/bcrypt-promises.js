var bcrypt = require('bcrypt')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

exports.comparePromised = function (candidate, current) {
  return callWithPromise(bcrypt, "compare", candidate, current);
};

exports.hashPromised = function (value, salt) {
  return callWithPromise(bcrypt, "hash", value, salt);
}
