var _ = require('lodash');

module.exports.throwIfMissing = _.curry(function (message, value) {
  if (!value) {
    throw new Error(message);
  }
  return value;
});

module.exports.throwIfFound = _.curry(function (message, value) {
  if (value) {
    throw new Error(message); 
  }
  return true;
});
