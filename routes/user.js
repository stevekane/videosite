var processNewUser = require('./user/processNewUser')
  , processChangeEmail = require('./user/processChangeEmail');

//create, update, delete, find
module.exports = function (app) {
  app.post("/user", processNewUser);
  app.post("/user/changeEmail", processChangeEmail);

  return app;   
}
