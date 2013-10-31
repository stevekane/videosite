var processNewUser = require('../system_behaviors/manage_users/process_new_user')
  , processChangeEmail = require('../system_behaviors/manage_users/process_change_email')
  , processChangePassword = require('../system_behaviors/manage_users/process_change_password')
  , processResetPassword = require('../system_behaviors/manage_users/process_reset_password')
  , login = require('../system_behaviors/manage_sessions/login')
  , logout = require('../system_behaviors/manage_sessions/logout')
  , restoreSession = require('../system_behaviors/manage_sessions/restore');

exports.configure = function (app, options) {
  var sendgrid = app.get('sendgrid')
    , passport = app.get('passport')
    , emailTemplates = app.get('emailTemplates')
    , subscribeTemplate = emailTemplates.subscribe
    , changeEmailTemplate = emailTemplates.changeEmail
    , resetPasswordTemplate = emailTemplates.resetPassword

  //sessions
  app.post('/user/login', passport.authenticate('local'), login);
  app.all('/user/logout', logout);
  app.get('/user/restore', restoreSession); 

  //user crud/lifecycle
  app.post('/users', processNewUser(sendgrid, subscribeTemplate));
  app.post('/user/create', processNewUser(sendgrid, subscribeTemplate));
  app.put('/user/edit', passport.verifyAuth, processChangeEmail);
  app.post('/user/pwchange', passport.verifyAuth, processChangePassword);
  app.post('/user/pwreset', processResetPassword(sendgrid, resetPasswordTemplate));

  return app;
}
