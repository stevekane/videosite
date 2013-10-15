require('routes/Application.js');

App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account');
});
