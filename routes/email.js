var _ = require('lodash')
  , sendEmail = require('./../systems/email').sendEmail
  , subscribeTemplate = require('../compiledEmails').subscribe;

exports.configure = function (app) {
  var sendEmailSuccess = _.curry(function (res, message) {
    res.send("Email sent!");
  });

  var sendEmailFailure = _.curry(function (res, err) {
    console.log(err.message);
    res.send(400, "Email not send!");
  });

  var sendMeAnEmail = function (req, res) {
    var config = {
      from: "kanesteven@gmail.com",
      to: "kanesteven@gmail.com",
      subject: "This is a targetted email",
      html: subscribeTemplate()
    };

    sendEmail(config)
    .then(sendEmailSuccess(res))
    .fail(sendEmailFailure(res))
    .done()
  };

  app.post("/email/test", sendMeAnEmail);   

  return app;
}
