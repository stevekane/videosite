var template = require('../templates/views').app;

function renderApp (req, res) {
  res.send(appTemplate());
}

module.exports = function (app) {
  app.get('/', renderApp); 
  return app;
}
