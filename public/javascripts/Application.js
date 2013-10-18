window.App = Ember.Application.create();

var get = Ember.get;

App.NodeAdapter = DS.RESTAdapter.extend({
  updateRecord: function(store, type, record){
    var data = {}
      , url = "http://localhost:3000/user/edit"
    data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record);

    var id = get(record, 'id');
    data[type.typeKey].id = id;
    
    return this.ajax(url, "PUT", { data: data });
  },

  restoreSession: function () {
    var url = "http://localhost:3000/user/restore";

    return this.ajax(url, "PUT");
  }

});

App.Store = DS.Store.extend({
  adapter: App.NodeAdapter,
  //adapter: DS.FixtureAdapter
});

require('Router.js');
require('Models.js');
require('Controllers.js');

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;
