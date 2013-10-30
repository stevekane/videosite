var _ = require('lodash')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

module.exports = {
  sendEmail: sendEmail,
}

/*
ReWrite
*/
//send an email with provided text and return a promise
var sendEmail = _.curry(function (sendgrid, config) {
  return callWithPromise(sendgrid, "send", config)
});
