minispade.register('Application.js', function() {
window.App = Ember.Application.create();

var get = Ember.get;

App.NodeAdapter = DS.RESTAdapter.extend({
  updateRecord: function(store, type, record){
    var data = {};
    var updateURL = "http://localhost:3000/user/edit"
    data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record);

    var id = get(record, 'id');
    data[type.typeKey].id = id;
    
    return this.ajax(updateURL, "PUT", { data: data });
  }
})

App.Store = DS.Store.extend({
  adapter: App.NodeAdapter
});


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

minispade.register('controllers/AccountChangePassword.js', function() {
var set = Ember.set
  , alias = Ember.computed.alias;

function sendPasswordChange(user, hash){
  var url = "http://localhost:3000/user/pwchange";
  
  $.ajax({
    url: url,
    type: 'POST',
    data: {
            id: user.id,
            email: user.email,
            password: hash.password
          },
    success: function(){
      alert("Password changed successfully!");
    },
    error: function(){
      alert("Password was not changed! Something happened on server.");
    }  
  })
}
  
App.AccountChangePasswordController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  newPasswordHash: {
    oldPassword: {value: "", error: ""},
    password: {value: "", error: ""},
    confirmPassword: {value: "", error: ""},
  },

  resetFields: function (passwordHash) {
    set(passwordHash, 'oldPassword.value', "");
    set(passwordHash, 'oldPassword.error', "");
    set(passwordHash, 'password.value', "");
    set(passwordHash, 'password.error', "");
    set(passwordHash, 'confirmPassword.value', "");
    set(passwordHash, 'confirmPassword.error', "");
  },

  actions: {
    
    changePassword: function (user, hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        password: hash.password.value,
        confirmPassword: hash.confirmPassword.value,
      };

      if (hash.password.value !== hash.confirmPassword.value) {
        passwordError = "Provided passwords did not match.";
        set(hash, "password.value", "");
        set(hash, "password.error", passwordError);
        set(hash, "confirmPassword.value", "");
        set(hash, "confirmPassword.error", passwordError);
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
          sendPasswordChange(user, hash);
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
    email: {value: "", error: ""},
    password: {value: "", error: ""}
  },
  
  resetFields: function (loginHash) {
    set(loginHash, 'email.value', "");
    set(loginHash, 'email.error', "");
    set(loginHash, 'password.value', "");
    set(loginHash, 'password.error', "");
  },
    
  actions:{
  
    attemptLogin: function (hash) {
      var passwordError
        , store = this.get('store')
        , self = this
        , values = {
        email: hash.email.value,
        password: hash.password.value,
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
          set(hash, "email.error", response.responseText);
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

App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

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
