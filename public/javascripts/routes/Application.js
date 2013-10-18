var set = Ember.set;

App.ApplicationRoute = Ember.Route.extend({
  
  actions: {
    
    logout: function (activeUser) {
      var store = this.get('store')
        , self = this
        , url = "http://localhost:3000/user/logout"
        , userController = this.controllerFor('user');

      //NOTE: this probably should wait for confirmation from the server
      //before showing the user that they are logged out...
      store.adapterFor('user').ajax(url, "POST")
      set(userController, "content", null);
      self.transitionTo('index');
    }
  },

  model: function (params) {
    var store = this.get('store')
      , url = "http://localhost:3000/user/restore"
      , request = store.adapterFor('user').ajax(url, "GET")

    return request.then(function (payload) {
      var p = new Ember.RSVP.Promise(function (resolve, reject) {
        var newUser;

        if (payload) {
          newUser = store.push("user", payload.user);
          resolve(newUser);
        } else {
          resolve(null); 
        }
      }); 
      return p;
    });
  },

  setupController: function (controller, model) {
    var store = this.get('store')
    var userController = this.controllerFor('user');
    console.log('fired');

    userController.set('content', model);
  }

});
