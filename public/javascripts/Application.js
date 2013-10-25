var get = Ember.get;

window.App = Ember.Application.create();

App.NodeAdapter = DS.RESTAdapter.extend({
  updateRecord: function(store, type, record){
    var data = {}
      , url = "http://localhost:3000/user/edit"
    data[type.typeKey] = store.serializerFor(type.typeKey).serialize(record);

    var id = get(record, 'id');
    data[type.typeKey].id = id;
    
    return this.ajax(url, "PUT", { data: data });
  },
});

require('Router.js');
require('Models.js');
require('Controllers.js');
require('Components.js');

App.Store = DS.Store.extend({
  adapter: App.NodeAdapter
});

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;

Stripe.setPublishableKey('pk_test_k6jIoHGla5uwBW9G7qXzapro');
