var processNewUser = require('./user/processNewUser')
  , processChangeEmail = require('./user/processChangeEmail')
  , processChangePassword = require('./user/processChangePassword');

//create, update, delete, find
module.exports = function (app) {
  app.post("/user", processNewUser);
  app.post("/user/changeEmail", processChangeEmail);
  app.post("/user/changePassword", processChangePassword);

  return app;   
}
