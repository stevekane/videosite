var handlebars = require('handlebars')
  , appTemplate = require('../templates/views')(handlebars).app;

function renderApp (req, res) {
  res.send(appTemplate());
}

module.exports = function (app) {
  app.get('/', renderApp); 
  return app;
}
