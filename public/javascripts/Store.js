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
});

App.Store = DS.Store.extend({
  adapter: App.NodeAdapter
});
