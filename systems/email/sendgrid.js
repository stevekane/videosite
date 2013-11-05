var Q = require('q')
  , callWithPromise = Q.ninvoke
  , sgConfig = require('../../config/config.json').sendgrid
  , sendgrid = require('sendgrid')(sgConfig.api_user, sgConfig.api_key);

//send an email with provided text and return a promise
var sendEmail = function (config) {
  return callWithPromise(sendgrid, "send", config);
};

module.exports = {
  sendEmail: sendEmail,
}
