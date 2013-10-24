var fs = require('fs')
  , _ = require('lodash')
  , handlebars = require('handlebars')
  , Q = require('q')
  , callWithPromise = Q.ninvoke;

//read a file and return promise
var readFile = function (fileName) {
  return callWithPromise(fs, "readFile", fileName, "utf8");
}

//apply a provided template function
var applyTemplate = _.curry(function (data, fn) {
  return fn(data); 
});

//send an email with provided text and return a promise
var sendEmail = _.curry(function (sendgrid, config, text) {
  config.text = text;
  return callWithPromise(sendgrid, "send", config)
});

var compileAndSendEmail = _.curry(function (sendgrid, config, fileName, data) {
  var prom = Q.defer();

  readFile(fileName)
  .then(handlebars.compile)
  .then(applyTemplate(data))
  .then(sendEmail(sendgrid, config))
  .then(function (json) { return prom.resolve("email sent!"); })
  .fail(function (err) { return prom.reject(err); })

  return prom.promise;
});

module.exports = {
  sendEmail: sendEmail,
  compileAndSendEmail: compileAndSendEmail,
}
