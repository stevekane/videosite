module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["signup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>You signed up bro, grats!</h1>\n";
  });

this["JST"]["subscribe"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!DOCTYPE HTML>\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"/vendor/reset-css/reset.css\">\n  <link rel=\"stylesheet\" href=\"/vendor/bootstrap/dist/css/bootstrap.min.css\">\n</head>\n<body>\n  <section class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-8 col-md-offset-2\">\n\n        <h1>Thanks for subscribing to EmberCasts!</h1>\n        <h3>We will send you updates when new content is available</h3>\n        <h5>Feedback is always welcome!</h5>\n      \n      </div> \n    </div>\n  </section>\n</body>\n</html>\n\n";
  });

return this["JST"];

};