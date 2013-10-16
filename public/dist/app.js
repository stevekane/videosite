minispade.register('Application.js', function() {
window.App = Ember.Application.create();

//App.Store = DS.Store.extend({
//  adapter: DS.FixtureAdapter
//});
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

});

minispade.register('Models.js', function() {

minispade.require('models/User.js');

});

minispade.register('Router.js', function() {

minispade.require('routes/Application.js');
minispade.require('routes/Account.js');
minispade.require('routes/AccountChangeEmail.js');

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
    email: {value: "", error: ""},
    confirmEmail: {value: "", error: ""},
  },

  resetFields: function (emailHash) {
    set(emailHash, 'email.value', "");
    set(emailHash, 'email.error', "");
    set(emailHash, 'confirmEmail.value', "");
    set(emailHash, 'confirmEmail.error', "");
  },

  actions: {
    
    changeEmail: function (user, hash) {
      var emailError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email.value,
        confirmEmail: hash.confirmEmail.value,
      };
      
      if (hash.email.value !== hash.confirmEmail.value) {
        emailError = "Provided emails did not match."
        set(hash, "email.value", "");
        set(hash, "email.error", emailError);
        set(hash, "confirmEmail.value", "");
        set(hash, "confirmEmail.error", emailError);
        return;
      } else {
        user.set('email', hash.email.value)
          .save()
          .then(function (user) { 
            self.resetFields(hash);
          })
          .fail(function (errors) {
            set(hash, "email.error", errors.email);             
            set(hash, "confirmEmail.error", errors.email);             
          });
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
  store.load(App.User, user);
};

App.LoginController = Ember.Controller.extend({
  needs: ['user'],
  activeUser: alias('controllers.user.content'),
  
  loginHash: {
    username: {value: "", error: ""},
    password: {value: "", error: ""},
  },
  
  resetFields: function (loginHash) {
    set(loginHash, 'username.value', "");
    set(loginHash, 'username.error', "");
    set(loginHash, 'password.value', "");
    set(loginHash, 'password.error', "");
  },
    
  actions:{
  
    attemptLogin: function(hash){
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        username: hash.username.value,
        password: hash.password.value,
      };
      window.store2 = store;
      
      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {username: values.username, 
               password: values.password
               },
        success: function(response){
          var user = response.user.user;
          var emberUser = store.push(App.User, user);
          self.set('activeUser', emberUser);
          self.resetFields(hash);
          self.transitionToRoute('index');
        },
        error: function(response){
          console.log(response.responseText);
          set(hash, "username.error", response.responseText);
          set(hash, "password.error", response.responseText);
        }
      })
    }
  }
});

});

minispade.register('controllers/Signup.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

var clearAndSetError = function (property, error) {
  set(property, "value", "");
  set(property, "error", error);
};


App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  newAccountHash: {
    username: {value: "", error: ""},
    email: {value: "", error: ""},
    password: {value: "", error: ""},
    confirmPassword: {value: "", error: ""}
  },

  resetFields: function (newAccountHash) {
    set(newAccountHash, 'username.value', "");
    set(newAccountHash, 'username.error', "");
    set(newAccountHash, 'email.value', "");
    set(newAccountHash, 'email.error', "");
    set(newAccountHash, 'password.value', "");
    set(newAccountHash, 'password.error', "");
    set(newAccountHash, 'confirmPassword.value', "");
    set(newAccountHash, 'confirmPassword.error', "");
  },

  actions: {
    
    signUp: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        username: hash.username.value,
        email: hash.email.value,
        password: hash.password.value,
        confirmPassword: hash.confirmPassword.value,
      };
      
      if (hash.password.value !== hash.confirmPassword.value) {
        passwordError = "Provided passwords did not match."
        set(hash, "password.value", "");
        set(hash, "confirmPassword.value", "");
        set(hash, "password.error", passwordError);
        set(hash, "confirmPassword.error", passwordError);
        return;
      } else {
        store.createRecord('user', values)
          .save()
          .then(function (user) { 
            self.set('activeUser', user);
            self.resetFields(hash);
            self.transitionToRoute('index');
          })
          .fail(function (errors) {
            set(hash, "username.error", errors.username);             
            set(hash, "email.error", errors.email);             
            set(hash, "password.error", errors.password);             
            set(hash, "confirmPassword.error", errors.confirmPassword);             
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
      ? {id: user.get('id'), username: user.get('username'), email: user.get('email')}
      : null;

    App.localStore.set('user', localStoredUser);
  }.observes('content', 'content.email', 'content.username')

});

});

minispade.register('models/User.js', function() {
var attr = DS.attr;

App.User = DS.Model.extend({
  
  username: attr(),
  password: attr(),
  email: attr(),

});

});

minispade.register('routes/Account.js', function() {
App.AccountRoute = Ember.Route.extend({});

});

minispade.register('routes/AccountChangeEmail.js', function() {
App.AccountChangeEmailRoute = Ember.Route.extend({});

});

minispade.register('routes/Application.js', function() {
var set = Ember.set;

App.ApplicationRoute = Ember.Route.extend({
  
  actions: {
    
    logout: function (activeUser) {
      var userController = this.controllerFor('user');
      set(userController, "content", null);
      this.transitionTo('index');
    }

  },

  model: function (params) {
    var store= this.get('store')
      , storedUser = App.localStore.get('user'); 

    return storedUser ? store.push('user', storedUser) : null;
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user')

    userController.set('content', model);
  }

});

});
