App.ApplicationRoute = Ember.Route.extend({
  
  model: function (params) {
    var emberStore = this.get('store')
      , storedUser = store.get('user'); 

    return storedUser ? emberStore.push('user', storedUser) : null;
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user')

    userController.set('content', model);
    console.log(userController.get('content.username')); 
  }

});
