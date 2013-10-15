Ember.TEMPLATES["account"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      <h1 class=\"text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'s Account</h1> \n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "account", options) : helperMissing.call(depth0, "linkTo", "account", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        <li ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Logout</li>\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("View Account");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "login", options) : helperMissing.call(depth0, "linkTo", "login", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li> \n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "login", options) : helperMissing.call(depth0, "linkTo", "login", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n      ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("Signup");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<!-- HEADER -->\n<nav class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\n  <div class=\"container\">\n    <ul class=\"nav navbar-nav pull-right\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "activeUser", {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  </div>\n</nav>\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!-- ABOUT -->\n<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      <h1 class=\"text-center\">EmberCasts</h1> \n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2 text-center\">\n      <h2>Saving the world before bedtime.</h2> \n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      <p class=\"big-p text-center\">\n        No you too can learn Ember.js through workshop-style videos focused on \n        solving problems that developers are likely to face in the real world.\n      </p> \n    </div>\n  </div>\n</section>\n");
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n\n          <form class=\"form-horizontal\" role=\"form\">\n\n            <div class=\"form-group\">\n              ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"form-group\">\n              ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            </div>\n\n            <div class=\"form-group\">\n              <button class=\"btn btn-submit\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateAccountInfo", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Update</button>\n            </div>\n\n          </form> \n\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n\n        <ul>\n          <li>\n        </ul>\n\n        ");
  }

  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      <h1 class=\"text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'s Account</h1> \n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-8 col-md-offset-2\">\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "editing", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n      </div>\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});