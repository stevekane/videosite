Ember.TEMPLATES["account"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n            <i class=\"glyphicon glyphicon-edit\"></i>Change Email\n          ");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n            <i class=\"glyphicon glyphicon-edit\"></i>Change Password\n          ");
  }

  data.buffer.push("<section class=\"container page-section\">\n  <header class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n\n      <h1 class=\"text-center\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("'s Account</h1>\n      <div class=\"row\">\n        <div class=\"col-md-4 col-md-offset-2 text-center\">\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account.changeEmail", options) : helperMissing.call(depth0, "link-to", "account.changeEmail", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n        <div class=\"col-md-4 text-center\">\n          ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "account.changePassword", options) : helperMissing.call(depth0, "link-to", "account.changePassword", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        </div>\n        </div>\n      </div>\n\n    </div>\n  </header>\n\n  <content class=\"row\">\n    <div class=\"col-md-4 col-md-offset-4\">\n      ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n    </div>\n  </content>\n\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["account/changeEmail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newEmailHash.email.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newEmailHash.confirmEmail.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    ");
  return buffer;
  }

  data.buffer.push("<form class=\"form-horizontal\" role=\"form\">\n  <legend>Change Your Email!</legend>\n  <div class=\"form-group\">\n    <label for=\"oldEmail\">Old Email</label>\n    <input class=\"form-control\" disabled ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "STRING"};
  options = {hash:{
    'value': ("email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></input>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"newEmail\">New Email</label>\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'classNames': ("form-control"),
    'placeholder': ("New Email"),
    'value': ("newEmailHash.email.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newEmailHash.email.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"newEmailConfirm\">Confirm New Email</label>\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'classNames': ("form-control"),
    'placeholder': ("Confirm New Email"),
    'value': ("newEmailHash.confirmEmail.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newEmailHash.confirmEmail.error", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeEmail", "content", "newEmailHash", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    Update Email\n  </button>\n</form>\n");
  return buffer;
  
});

Ember.TEMPLATES["account/changePassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newPasswordHash.oldPassword.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newPasswordHash.password.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "newPasswordHash.confirmPassword.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n    ");
  return buffer;
  }

  data.buffer.push("<form class=\"form-horizontal\" role=\"form\">\n  <legend>Change Your Password!</legend>\n\n  <div class=\"form-group\">\n    <label for=\"oldPassword\">Old Password</label>\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'classNames': ("form-control"),
    'placeholder': ("Old Password"),
    'value': ("newPasswordHash.oldPassword.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newPasswordHash.oldPassword.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"newPassword\">New Password</label>\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'classNames': ("form-control"),
    'placeholder': ("New Password"),
    'value': ("newPasswordHash.password.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newPasswordHash.password.error", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"newPasswordConfirm\">Confirm New Password</label>\n    ");
  hashContexts = {'type': depth0,'classNames': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'classNames': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'classNames': ("form-control"),
    'placeholder': ("Confirm New Password"),
    'value': ("newPasswordHash.confirmPassword.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "newPasswordHash.confirmPassword.error", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </div>\n\n  <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "changePassword", "content", "newPasswordHash", {hash:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    Update Password\n  </button>\n</form>\n");
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
  data.buffer.push("\n        <span class=\"navbar-text\">Signed in as ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
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
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n        <form class=\"form-horizontal\" role=\"form\">\n          <legend>Login</legend>\n          <div class=\"form-group\">\n            <label for=\"email\">Email</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your Email"),
    'value': ("loginHash.email.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "loginHash.email.error", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("loginHash.password.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "loginHash.password.error", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("  \n              \n          </div>\n\n          <div class=\"form-group\">\n            <button class=\"btn btn-success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "attemptLogin", "loginHash", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login!</button>\n          </div>\n        </form> \n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "loginHash.email.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n              <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "loginHash.password.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <h2> Already logged in as: ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "activeUser.email", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h2>\n      ");
  return buffer;
  }

  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-md-offset-4\">\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.unless.call(depth0, "activeUser", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </div>\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["signup"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<section class=\"container page-section\">\n  <div class=\"row\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-md-offset-4\">\n\n        <form class=\"form-horizontal\" role=\"form\">\n          <legend>Create Free Account!</legend>\n          <div class=\"form-group\">\n            <label for=\"email\">Email</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("email"),
    'class': ("form-control"),
    'placeholder': ("Your Email"),
    'value': ("newAccountHash.email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"password\">Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Password"),
    'value': ("newAccountHash.password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"confirmPassword\">Confirm Password</label>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'placeholder': ("Confirm Password"),
    'value': ("newAccountHash.confirmPassword")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n\n          <div class=\"form-group\">\n            <button class=\"btn btn-warning\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "signUp", "newAccountHash", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Create!</button>\n            <small class=\"text-danger\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</small>\n          </div>\n        </form> \n\n      </div>\n    </div>\n  </div>\n</section>\n");
  return buffer;
  
});