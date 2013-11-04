var processNewUser = require('./user/processNewUser')
  , processChangeEmail = require('./user/processChangeEmail')
  , processChangePassword = require('./user/processChangePassword')
  , processResetPassword = require('./user/processResetPassword');

//create, update, delete, find
module.exports = function (app) {
  app.post("/user/signup", processNewUser);
  app.post("/user/changeEmail", processChangeEmail);
  app.post("/user/changePassword", processChangePassword);
  app.post("/user/resetPassword", processResetPassword);

  return app;   
}
