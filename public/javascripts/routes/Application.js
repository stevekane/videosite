App.ApplicationRoute = Ember.Route.extend({
  
  model: function (params) {
    var store= this.get('store')
      , storedUser = App.localStore.get('user'); 

    return storedUser ? store.push('user', storedUser) : null;
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user')

    userController.set('content', model);
    console.log(userController.get('content.username')); 
  }

});
