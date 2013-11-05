var processNewUser = require('./user/processNewUser')
  , processChangeEmail = require('./user/processChangeEmail')
  , processChangePassword = require('./user/processChangePassword')
  , processResetPassword = require('./user/processResetPassword')
  , login = require('./user/login')
  , logout = require('./user/logout')
  , restoreSession = require('./user/restoreSession');

//create, update, delete, find
module.exports = function (app) {
  var authenticate = app.get('passport').authenticate("local");

  app.post("/user/signup", processNewUser);
  app.post("/user/changeEmail", processChangeEmail);
  app.post("/user/changePassword", processChangePassword);
  app.post("/user/resetPassword", processResetPassword);

  //session-related endpoints
  app.post("/user/login", authenticate, login);
  app.post("/user/logout", logout);
  app.get("/user/restore", restoreSession);

  return app;   
}
