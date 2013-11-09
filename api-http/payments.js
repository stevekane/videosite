var processNewSubscription = require('./payments/processNewSubscription')
  , verifyAuth = require('../utils/session').verifyAuth;

module.exports = function (app) {
  app.post("/subscription/new", verifyAuth, processNewSubscription);

  return app;
}
