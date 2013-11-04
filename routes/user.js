var processNewUser = require('./user/processNewUser');

//create, update, delete, find
module.exports = function (app) {
  app.post("/user", processNewUser);

  return app;   
}
