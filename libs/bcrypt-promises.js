var bcrypt = require('bcrypt')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

exports.comparePromised = function (current, candidate) {
  return callWithPromise(bcrypt, "compare", candidate, current);
};

exports.hashPromised = function (salt, value) {
  return callWithPromise(bcrypt, "hash", value, salt);
}
