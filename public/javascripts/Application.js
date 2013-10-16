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



require('Router.js');
require('Models.js');
require('Controllers.js');

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
 App.localStore = store;
 store = null;

