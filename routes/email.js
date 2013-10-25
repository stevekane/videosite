var _ = require('lodash')
  , email = require('./../libs/email');

exports.configure = function (app) {
  var sendgrid = app.get('sendgrid')
    , tmplName = "./templates/email/bootstrap-test.handlebars";
    

  var sendEmailSuccess = _.curry(function (res, message) {
    console.log(message);
    res.send("Email sent!");
  });

  var sendEmailFailure = _.curry(function (res, err) {
    console.log(err.message);
    res.send(400, "Email not send!");
  });

  var sendUserAnEmail = _.curry(function (sendgrid, req, res) {
    var target = req.body.email
      , data = {name: req.body.name}
      , config = {
        from: "kanesteven@gmail.com",
        to: target,
        subject: "This is a targetted email"
      };

    if (!email) { res.send(400, "No email provided."); }

    email.compileAndSendEmail(sendgrid, config, tmplName, data)
    .then(sendEmailSuccess(res))
    .fail(sendEmailFailure(res))
    .done()
  });

  app.post("/email/user", sendUserAnEmail(sendgrid));   
  app.post("/email/test", function (req, res) {
    res.send("i got it"); 
  });

  return app;
}
