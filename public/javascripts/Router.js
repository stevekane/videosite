require('routes/Application.js');
require('routes/Account.js');
require('routes/AccountChangeEmail.js');

App.Router.map(function () {
  this.resource('signup');
  this.resource('login');
  this.resource('account', function () {
    this.route('changeEmail');
    this.route('changePassword');
  });
});
