module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["changeEmail"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>You changed your email????</h1>\n";
  });

this["JST"]["resetPassword"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>You have reset your password.</h1>\n<p>Your temporary password is <b>";
  if (stack1 = helpers.password) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.password; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b></p>\n";
  return buffer;
  });

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