var set = Ember.set
  , alias = Ember.computed.alias;

App.LoginController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  actions: {
    //called by form component to set activeUser
    storeAndSetUser: function (user) {
      var storedUser = this.get('store').push('user', user);
      this.set('activeUser', storedUser);
      this.transitionToRoute("index"); 
    },
  }
});
