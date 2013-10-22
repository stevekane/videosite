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

App.braintree = Braintree.create(
  "MIIBCgKCAQEA2K0yLIBW5LaGHYYYPzqRVkCYDDj7zwy305iTkNmzHgKw3nVOTBc9JFIjTtkxFVKLAU9XhcNByjqMLsr0S0PPsX0pYkufUeMhR0X1TYZ1JLBN4p+5OxvledR0KZvy0fJYEuNF5zZhyft65t83HmWei71Pt3m/u58uMqItwyQ0R1d1h2u1CUQIvGQEQd35pXwu83iIsymE7tKw81W3jm8d4F6LQZMFOctiNQS7TqcQlfgsxMjqJyWJF5vx29X1BGlL6wuKe/0skzdrmVHRQKBqfqAPAo0Y+i0V2epdDGyR9nO6cJYDJSh8axhxU+n/FK1nASYEnwncQMjfgJOk9bDUfQIDAQAB"
);

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;
