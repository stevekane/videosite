window.App = Ember.Application.create();

require('Router.js');
require('Models.js');

App.deferReadiness();

var activeUser = localStorage['user'];

console.log(activeUser);

App.advanceReadiness();
