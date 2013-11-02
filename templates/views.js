module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["app"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!DOCTYPE HTML>\n<html>\n\n<head>\n  <!-- <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'> -->\n  <link rel=\"stylesheet\" href=\"/vendor/reset-css/reset.css\">\n  <link rel=\"stylesheet\" href=\"/vendor/bootstrap/dist/css/bootstrap.min.css\">\n  <link rel=\"stylesheet\" href=\"dist/appsass.css\">\n</head>\n<body>\n  \n  <script src=\"http://localhost:35729/livereload.js?snipver=1\"></script>\n\n  <script type-\"text/javascript\" src=\"/vendor/moment/moment.js\"></script>\n  <script type=\"text/javascript\" src=\"https://js.stripe.com/v2/\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/minispade/lib/main.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/jquery/jquery.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/lodash/lodash.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/handlebars/handlebars.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/ember/ember.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/ember-data.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/flying-focus.js\"></script>\n  <script type=\"text/javascript\" src=\"/vendor/store/store.min.js\"></script>\n\n  <script type=\"text/javascript\" src=\"/dist/app.js\"></script>\n  <script type=\"text/javascript\" src=\"/dist/apptemplates.js\"></script>\n\n  <script type=\"text/javascript\">\n    minispade.require('Application.js'); \n  </script>\n\n</body>\n\n</html>\n";
  });

return this["JST"];

};