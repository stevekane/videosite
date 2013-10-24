var _ = require('lodash')
  , email = require('./../libs/email');

exports.configure = function (app) {
  var sendgrid = app.get('sendgrid');

  var config = {
    from: "kanesteven@gmail.com",
    to: "kanesteven@gmail.com",
    subject: "This is a test email"
  };

  //partially apply w/ provided hb, sendgrid, and config
  var sendFromMeToMe = email.compileAndSendEmail(sendgrid, config);

  var processTestEmail = function (req, res) {
    sendFromMeToMe("./templates/email/test.handlebars", {name: "Steverino"})
    .then(function (message) {
      console.log(message);
      res.send("Email sent!");
    })
    .fail(function (err) {
      console.log(err.message);
      res.send(400, "Email not sent!")
    })
    .done();
  };

  app.get("/email/test", processTestEmail);   
  return app;
}
