var set = Ember.set;

App.ApplicationRoute = Ember.Route.extend({
  
  actions: {
    
    logout: function (activeUser) {
      var userController = this.controllerFor('user');
      set(userController, "content", null);
      this.transitionTo('index');
    }

  },

  model: function (params) {
    var store= this.get('store')
      , storedUser = App.localStore.get('user'); 

    return storedUser ? store.push('user', storedUser) : null;
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user')

    userController.set('content', model);
  }

});
