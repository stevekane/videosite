var _ = require('lodash')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

//send an email with provided text and return a promise
var sendEmail = _.curry(function (sendgrid, config) {
  return callWithPromise(sendgrid, "send", config)
});

module.exports = {
  sendEmail: sendEmail,
}
