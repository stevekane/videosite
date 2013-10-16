Ember.TEMPLATES["account"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n\n        <form class=\"form-horizontal\" role=\"form\">\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("New Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Confirm New Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <button class=\"btn btn-submit\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateAccountInfo", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Update Account Settings</button>\n          </div>\n        </form> \n\n      ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n\n        <ul>\n          <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n          <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n        </ul>\n\n      ");
  return buffer;
  }

  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      <h1 class=\"text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'s Account</h1> \n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "editing", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("EmberCasts");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <span class=\"navbar-text\">Signed in as ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account", options) : helperMissing.call(depth0, "link-to", "account", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n        <li><a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Logout</a></li>\n      ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("View Account");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "signup", options) : helperMissing.call(depth0, "link-to", "signup", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li> \n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\n      ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Signup");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<!-- HEADER -->\n<nav class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("navbar-brand")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \n    </div>\n\n    <ul class=\"nav navbar-nav pull-right\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "activeUser", {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
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

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-md-offset-4\">\n\n        <form class=\"form-horizontal\" role=\"form\">\n          <legend>Login</legend>\n          <div class=\"form-group\">\n            <label for=\"username\">Username</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Username"),
    'value': ("username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <button class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateAccountInfo", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login!</button>\n          </div>\n        </form> \n\n      </div>\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.username.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.email.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.password.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.confirmPassword.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-md-offset-4\">\n\n        <form class=\"form-horizontal\" role=\"form\">\n          <legend>Create Free Account!</legend>\n          <div class=\"form-group\">\n            <label for=\"username\">Username</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Username"),
    'value': ("newAccountHash.username.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.username.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"email\">Email</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'class': ("form-control"),
    'placeholder': ("Your Email"),
    'value': ("newAccountHash.email.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.email.error", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("newAccountHash.password.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.password.error", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"confirmPassword\">Confirm Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Confirm Password"),
    'value': ("newAccountHash.confirmPassword.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.confirmPassword.error", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "signUp", "newAccountHash", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Create!</button>\n          </div>\n        </form> \n\n      </div>\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});