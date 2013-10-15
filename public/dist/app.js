minispade.register('Application.js', function() {
window.App = Ember.Application.create();
minispade.require('Router.js');
minispade.require('Models.js');

App.deferReadiness();

var activeUser = localStorage['user'];

console.log(activeUser);

App.advanceReadiness();

});

minispade.register('Models.js', function() {

minispade.require('models/User.js');

});

minispade.register('Router.js', function() {
App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account');
});

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
