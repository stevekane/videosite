minispade.register('Application.js', function() {
window.App = Ember.Application.create();
minispade.require('Router.js');
minispade.require('Models.js');
minispade.require('Controllers.js');

});

minispade.register('Controllers.js', function() {

minispade.require('controllers/Application.js');
minispade.require('controllers/User.js');
minispade.require('controllers/Login.js');
minispade.require('controllers/Signup.js');

});

minispade.register('Models.js', function() {

minispade.require('models/User.js');

});

minispade.register('Router.js', function() {

minispade.require('routes/Application.js');

App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account');
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
App.LoginController = Ember.Controller.extend({
  username: null,
  password: null,
  actions:{
    updateAccountInfo: function(){
      user = this.get('username');
      password = this.get('password');
      _this = this;
      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/login",
        data: {username:user, password: password},
        success: function(response){
          console.log("OK!", response);
        },
        error: function(response){
          console.log(response);
        },
        complete: function(res){
          _this.setProperties({username: null, password: null});
        }
      });
    }
  }
});
});

minispade.register('controllers/Signup.js', function() {
App.SignupController = Ember.Controller.extend({
  username: null,
  password: null,
  confirmPassword: null,
  email: null,
  actions:{
    createNewAccount: function(){
      user = this.get('username');
      password = this.get('password');
      passwordConfirm = this.get('confirmPassword');
      email = this.get('email');
      _this = this;
      
      $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/create",
        data: {username:user, password: password, email: email},
        success: function(response){
          console.log("OK!", response);
        },
        error: function(response){
          console.log(response);
        },
        complete: function(res){
          _this.setProperties({username: null, password: null});
        }
      });
    }
  }

});
});

minispade.register('controllers/User.js', function() {
App.UserController = Ember.ObjectController.extend({});

});

minispade.register('models/User.js', function() {
var attr = DS.attr;

App.User = DS.Model.extend({
  
  username: attr(),
  firstName: attr(),
  lastName: attr(),

  email: "",

  fullName: function () {
    return this.get('firstName') + this.get('lastName'); 
  }.property('firstName', 'lastName')

});

});

minispade.register('routes/Application.js', function() {
App.ApplicationRoute = Ember.Route.extend({
  
  model: function (params) {
    var emberStore = this.get('store')
      , storedUser = store.get('user'); 

    return storedUser ? emberStore.push('user', storedUser) : null;
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user')

    userController.set('content', model);
    console.log(userController.get('content.username')); 
  }

});

});
