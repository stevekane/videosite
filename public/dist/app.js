minispade.register('Application.js', function() {
window.App = Ember.Application.create();
minispade.require('Router.js');
minispade.require('Models.js');
minispade.require('Controllers.js');

});

minispade.register('Controllers.js', function() {

minispade.require('controllers/User.js');

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
    return store.get('user'); 
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user');
    userController.set('content', model);
    console.log(model); 
  }

});

});
