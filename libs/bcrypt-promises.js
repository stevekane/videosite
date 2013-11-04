var bcrypt = require('bcrypt')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

var comparePromised = function (current, candidate) {
  return callWithPromise(bcrypt, "compare", candidate, current);
};

//TODO: could be refactored to accept an array as first arg
var compareMultiplePromised = function (primary, secondary, candidate) {
  var comparePromise = Q.defer()
    , comparisons = [
        comparePromised(primary, candidate),
        comparePromised(secondary, candidate)
      ];

  Q.all(comparisons)
  .spread(function (primaryMatch, secondaryMatch) {
    if (primaryMatch || secondaryMatch) {
      comparePromise.resolve(true); 
    } else {
      comparePromise.reject(new Error("Neither option matched"));
    }
  })
  .fail(comparePromise.reject);

  return comparePromise.promise;
}

var hashPromised = function (salt, value) {
  return callWithPromise(bcrypt, "hash", value, salt);
}

module.exports = {
  comparePromised: comparePromised,
  compareMultiplePromised: compareMultiplePromised,
  hashPromised: hashPromised
}
