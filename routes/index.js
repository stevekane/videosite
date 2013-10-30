var renderApplication = function (req, res) {
  res.render('index');
}

exports.configure = function (app) {
  app.get('/', renderApplication);
}
