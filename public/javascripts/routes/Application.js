var set = Ember.set;

App.ApplicationRoute = Ember.Route.extend({
  
  actions: {
    
    logout: function () {
      var store = this.get('store')
        , userController = this.controllerFor('user');

      userController.logout(store);
    },

    redirectToLogin: function () {
      this.transitionTo("login"); 
    }
  },

  model: function (params) {
    var store = this.get('store')
      , userController = this.controllerFor("user");

    return userController.restoreSession(store);
  },

  setupController: function (controller, model) {
    var userController = this.controllerFor('user');
    userController.set('content', model);
  }

});
