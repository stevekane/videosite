window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  adapter: DS.FixtureAdapter
});

require('Router.js');
require('Models.js');
require('Controllers.js');

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;
