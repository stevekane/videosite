Ember.TEMPLATES["account"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n            <i class=\"glyphicon glyphicon-edit\"></i>Change Email\r\n          ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n            <i class=\"glyphicon glyphicon-edit\"></i>Change Password\r\n          ");
  }

  data.buffer.push("<section class=\"container page-section\">\r\n  <header class=\"row\">\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n\r\n      <h1 class=\"text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'s Account</h1>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-4 col-md-offset-2 text-center\">\r\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account.changeEmail", options) : helperMissing.call(depth0, "link-to", "account.changeEmail", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"col-md-4 text-center\">\r\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account.changePassword", options) : helperMissing.call(depth0, "link-to", "account.changePassword", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n        </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </header>\r\n\r\n  <section class=\"row\">\r\n    <content class=\"col-md-4 col-md-offset-1\">\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col-md-6\">\r\n          <h4>Username</h4>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\r\n        </div>\r\n\r\n        <div class=\"col-md-6\">\r\n          <h4>Email</h4>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <h4>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h4>\r\n        </div>\r\n      </div>\r\n\r\n    </content>\r\n    <aside class=\"col-md-offset-1 col-md-4\">\r\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \r\n    </aside>\r\n  </section>\r\n\r\n</section>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["account/changeEmail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newEmailHash.email.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newEmailHash.confirmEmail.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n    ");
  return buffer;
  }

  data.buffer.push("<form class=\"form-horizontal\" role=\"form\">\r\n  <legend>Change Your Email!</legend>\r\n  <div class=\"form-group\">\r\n    <label for=\"oldEmail\">Old Email</label>\r\n    <input class=\"form-control\" disabled ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "STRING"};
  options = {hash:{
    'value': ("email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></input>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"newEmail\">New Email</label>\r\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'classNames': ("form-control"),
    'placeholder': ("New Email"),
    'value': ("newEmailHash.email.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newEmailHash.email.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"newEmailConfirm\">Confirm New Email</label>\r\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'classNames': ("form-control"),
    'placeholder': ("Confirm New Email"),
    'value': ("newEmailHash.confirmEmail.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newEmailHash.confirmEmail.error", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n  </div>\r\n\r\n  <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeEmail", "content", "newEmailHash", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    Update Email\r\n  </button>\r\n</form>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["account/changePassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["account/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


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
  data.buffer.push("\r\n        <span class=\"navbar-text\">Signed in as ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.username", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account", options) : helperMissing.call(depth0, "link-to", "account", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n        <li><a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Logout</a></li>\r\n      ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("View Account");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "signup", options) : helperMissing.call(depth0, "link-to", "signup", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li> \r\n        <li>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</li>\r\n      ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Signup");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("Login");
  }

  data.buffer.push("<!-- HEADER -->\r\n<nav class=\"navbar navbar-fixed-top navbar-inverse\" role=\"navigation\">\r\n  <div class=\"container\">\r\n    <div class=\"navbar-header\">\r\n      ");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("navbar-brand")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push(" \r\n    </div>\r\n\r\n    <ul class=\"nav navbar-nav pull-right\">\r\n      ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "activeUser", {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    </ul>\r\n  </div>\r\n</nav>\r\n\r\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!-- ABOUT -->\r\n<section class=\"container page-section\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n      <h1 class=\"text-center\">EmberCasts</h1> \r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-8 col-md-offset-2 text-center\">\r\n      <h2>Saving the world before bedtime.</h2> \r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n      <p class=\"big-p text-center\">\r\n        No you too can learn Ember.js through workshop-style videos focused on \r\n        solving problems that developers are likely to face in the real world.\r\n      </p> \r\n    </div>\r\n  </div>\r\n</section>\r\n");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"container page-section\">\r\n  <div class=\"row\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 col-md-offset-4\">\r\n\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <legend>Login</legend>\r\n          <div class=\"form-group\">\r\n            <label for=\"username\">Username</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Username"),
    'value': ("username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"password\">Password</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <button class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateAccountInfo", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login!</button>\r\n          </div>\r\n        </form> \r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.username.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.email.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.password.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newAccountHash.confirmPassword.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\r\n            ");
  return buffer;
  }

  data.buffer.push("<section class=\"container page-section\">\r\n  <div class=\"row\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 col-md-offset-4\">\r\n\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <legend>Create Free Account!</legend>\r\n          <div class=\"form-group\">\r\n            <label for=\"username\">Username</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Username"),
    'value': ("newAccountHash.username.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.username.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"email\">Email</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'class': ("form-control"),
    'placeholder': ("Your Email"),
    'value': ("newAccountHash.email.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.email.error", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"password\">Password</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("newAccountHash.password.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.password.error", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"confirmPassword\">Confirm Password</label>\r\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Confirm Password"),
    'value': ("newAccountHash.confirmPassword.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newAccountHash.confirmPassword.error", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n          </div>\r\n\r\n          <div class=\"form-group\">\r\n            <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "signUp", "newAccountHash", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Create!</button>\r\n          </div>\r\n        </form> \r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n");
  return buffer;
  
});