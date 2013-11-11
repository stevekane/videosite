var template = require('../templates/views').admin;

function renderAdmin (req, res) {
  res.send(template());
}

module.exports = function (app) {
  app.get('/admin', renderAdmin); 
  return app;
}
