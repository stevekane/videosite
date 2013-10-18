minispade.register('Application.js', function() {
window.App = Ember.Application.create();

var get = Ember.get;

App.NodeAdapter = DS.RESTAdapter.extend({
  updateRecord: function(store, type, record){
    var data = {}
      , url = "http://localhost:3000/user/edit"
    data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record);

    var id = get(record, 'id');
    data[type.typeKey].id = id;
    
    return this.ajax(url, "PUT", { data: data });
  },

  restoreSession: function () {
    var url = "http://localhost:3000/user/restore";

    return this.ajax(url, "PUT");
  }

});

App.Store = DS.Store.extend({
  adapter: App.NodeAdapter,
  //adapter: DS.FixtureAdapter
});
minispade.require('Router.js');
minispade.require('Models.js');
minispade.require('Controllers.js');

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;

});

minispade.register('Controllers.js', function() {

minispade.require('controllers/Application.js');
minispade.require('controllers/User.js');
minispade.require('controllers/Login.js');
minispade.require('controllers/Signup.js');
minispade.require('controllers/Account.js');
minispade.require('controllers/AccountChangeEmail.js');
minispade.require('controllers/AccountChangePassword.js');

});

minispade.register('Models.js', function() {

minispade.require('models/User.js');

});

minispade.register('Router.js', function() {

minispade.require('routes/Application.js');
minispade.require('routes/Account.js');

App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account', function () {
    this.route('changeEmail');
    this.route('changePassword');
  });
});

});

minispade.register('controllers/Account.js', function() {
var alias = Ember.computed.alias
  , set = Ember.set;

App.AccountController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

});

});

minispade.register('controllers/AccountChangeEmail.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangeEmailController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newEmailHash: {
    email: "",
    confirmEmail: "",
  },

  resetFields: function (emailHash) {
    set(emailHash, 'email', "");
    set(emailHash, 'confirmEmail', "");
  },

  actions: {
    
    changeEmail: function (user, hash) {
      var emailError
        , previousEmail = user.get('email')
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        confirmEmail: hash.confirmEmail,
      };
      
      if (hash.email === previousEmail) {
        self.resetFields(hash);
        set(self, "error", previousEmail + " is already your email address!");
        return;
      }

      if (hash.email !== hash.confirmEmail) {
        set(self, "error", "Provided emails did not match");             
        set(hash, "email", "");
        set(hash, "confirmEmail", "");
        return;
      } else {
        user.set('email', hash.email)
          .save()
          .then(function (user) { 
            self.resetFields(hash);
          })
          .fail(function (error) {
            user.set('email', previousEmail);
            console.log(error);
            set(self, "error", JSON.parse(error.responseText)['error']);             
          });
      }
    }
  }

});

});

minispade.register('controllers/AccountChangePassword.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

function sendPasswordChange(user, hash, self){
  var url = "http://localhost:3000/user/pwchange";
  
  $.ajax({
    url: url,
    type: 'POST',
    data: {
            id: user.id,
            email: user.email,
            oldpassword: hash.oldPassword,
            password: hash.password
          },
    success: function(){
      self.resetFields(hash);
      alert("Password changed successfully!");
      
    },
    error: function(error){
      self.resetFields(hash);
      alert("Password was not changed!");
      set(self, "error", JSON.parse(error.responseText)['error']);
    }  
  })
}
  
App.AccountChangePasswordController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newPasswordHash: {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  },

  resetFields: function (passwordHash) {
    set(passwordHash, 'oldPassword', "");
    set(passwordHash, 'password', "");
    set(passwordHash, 'confirmPassword', "");
  },

  actions: {
    
    changePassword: function (user, hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        password: hash.password,
        confirmPassword: hash.confirmPassword,
      };

      if (hash.password !== hash.confirmPassword) {
        passwordError = "Provided passwords did not match.";
        set(hash, "password", "");
        set(hash, "confirmPassword", "");
        set(this, "error", passwordError);
        return;
      } else {
        // user.set('password', hash.password.value)
          // .save()
          // .then(function (user) { 
            // self.resetFields(hash);
          // })
          // .fail(function (errors) {
            // set(hash, "password.error", errors.password);             
            // set(hash, "confirmPassword.error", errors.password);             
          // });
          sendPasswordChange(user, hash, self);
      }
    }
  }

});

});

minispade.register('controllers/Application.js', function() {
var alias = Ember.computed.alias;

App.ApplicationController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content')

});

});

minispade.register('controllers/Login.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

var clearAndSetError = function (property, error) {
  set(property, "value", "");
  set(property, "error", error);
};

function loginUser(user, store){
  store.load("user", user);
};

App.LoginController = Ember.Controller.extend({
  needs: ['user'],
  activeUser: alias('controllers.user.content'),
  
  loginHash: {
    email: "",
    password: ""
  },
  
  resetFields: function (loginHash) {
    set(loginHash, 'email', "");
    set(loginHash, 'password', "");
  },
    
  actions:{
  
    attemptLogin: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        password: hash.password,
      };

      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {
          email: values.email, 
          password: values.password
        },
        success: function (response) {
          var emberUser = store.push('user', response.user);
          self.set('activeUser', emberUser);
          self.resetFields(hash);
          self.transitionToRoute('index');
        },
        error: function (response) {
          set(self, "error", "Unauthorized"); 
        }
      })
    }
  }
});

});

minispade.register('controllers/Signup.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  error: "",

  newAccountHash: {
    email: "",
    password: "",
    confirmPassword: ""
  },

  resetFields: function (newAccountHash) {
    set(newAccountHash, 'email', "");
    set(newAccountHash, 'password', "");
    set(newAccountHash, 'confirmPassword', "");
  },

  actions: {
    
    signUp: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email,
        password: hash.password,
      };
      
      if (hash.password !== hash.confirmPassword) {
        set(self, "error", "Provided passwords did not match.");
        set(hash, "password", "");
        set(hash, "confirmPassword", "");
        return;
      } else {
        store.createRecord('user', values)
        .save()
        .then(function (user) { 
          self.set('activeUser', user);
          self.resetFields(hash);
          self.transitionToRoute('index');
        })
        .fail(function (error) {
          console.log(error);
          set(self, "error", JSON.parse(error.responseText)['error']);             
        });
      }
    }
  }
});

});

minispade.register('controllers/User.js', function() {
App.UserController = Ember.ObjectController.extend({

  storeInLocalStorage: function () {
    var user = this.get('content');
    var localStoredUser = user 
      ? {id: user.get('id'), email: user.get('email')}
      : null;

    App.localStore.set('user', localStoredUser);
  }.observes('content', 'content.email')

});

});

minispade.register('models/User.js', function() {
var attr = DS.attr;

App.User = DS.Model.extend({
  password: attr(),
  email: attr(),
});

});

minispade.register('routes/Account.js', function() {
App.AccountRoute = Ember.Route.extend({});

});

minispade.register('routes/Application.js', function() {
var set = Ember.set;

App.ApplicationRoute = Ember.Route.extend({
  
  actions: {
    
    logout: function (activeUser) {
      var store = this.get('store')
        , self = this
        , url = "http://localhost:3000/user/logout"
        , userController = this.controllerFor('user');

      //NOTE: this probably should wait for confirmation from the server
      //before showing the user that they are logged out...
      store.adapterFor('user').ajax(url, "POST")
      set(userController, "content", null);
      self.transitionTo('index');
    }
  },

  model: function (params) {
    var store = this.get('store')
      , url = "http://localhost:3000/user/restore"
      , request = store.adapterFor('user').ajax(url, "GET")

    return request.then(function (payload) {
      var p = new Ember.RSVP.Promise(function (resolve, reject) {
        var newUser;

        if (payload) {
          newUser = store.push("user", payload.user);
          resolve(newUser);
        } else {
          resolve(null); 
        }
      }); 
      return p;
    });
  },

  setupController: function (controller, model) {
    var store = this.get('store')
    var userController = this.controllerFor('user');
    console.log('fired');

    userController.set('content', model);
  }

});

});
