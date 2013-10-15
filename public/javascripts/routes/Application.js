App.ApplicationRoute = Ember.Route.extend({
  
  model: function (params) {
    return store.get('user'); 
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user');
    userController.set('content', model);
    console.log(model); 
  }

});
