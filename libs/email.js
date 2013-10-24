var fs = require('fs')
  , _ = require('lodash')
  , handlebars = require('handlebars')
  , Q = require('q');

var callWithPromise = Q.ninvoke;

var sendEmailWithTemplate = _.curry(function (sendgrid, config, templateFn, data) {
  var hash = _.clone(config);

  hash.text = templateFn(data);
  return callWithPromise(sendgrid, "send", hash);
});

var compileEmail = _.curry(function (fileName) {
  var fileContent = fs.readFileSync(fileName, "utf8");
  return handlebars.compile(fileContent);
});

var compileAndSendEmail = _.curry(function (sendgrid, config, fileName, data) {
  var templateFn = compileEmail(fileName);
  sendEmailWithTemplate(sendgrid, config, templateFn, data)
  .then(function () {console.log("email sent!");})
  .fail(function (err) {console.log(err.message);})
  .done();
});

module.exports = {
  compileEmail: compileEmail,
  compileAndSendEmail: compileAndSendEmail,
  sendEmailWithTemplate: sendEmailWithTemplate
}
