var _ = require('lodash')
  , email = require('./../libs/email')
  , handlebars = require('handlebars')
  , emailTemplates = require('../compiledEmails')(handlebars);

exports.configure = function (app) {
  var sendgrid = app.get('sendgrid');

  var sendEmailSuccess = _.curry(function (res, message) {
    console.log(message);
    res.send("Email sent!");
  });

  var sendEmailFailure = _.curry(function (res, err) {
    console.log(err.message);
    res.send(400, "Email not send!");
  });

  var sendMeAnEmail = _.curry(function (sendgrid, req, res) {
    var config = {
        from: "kanesteven@gmail.com",
        to: "kanesteven@gmail.com",
        subject: "This is a targetted email",
        html: emailTemplates['subscribe']({})
      };

    email.sendEmail(sendgrid, config)
    .then(sendEmailSuccess(res))
    .fail(sendEmailFailure(res))
    .done()
  });

  app.post("/email/test", sendMeAnEmail(sendgrid));   

  return app;
}
