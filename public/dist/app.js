minispade.register('Application.js', function() {
window.App = Ember.Application.create();
minispade.require('Router.js');

});

minispade.register('Router.js', function() {
App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account');
});

});
