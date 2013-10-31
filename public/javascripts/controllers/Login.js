var set = Ember.set
  , alias = Ember.computed.alias;

App.LoginController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  actions: {
    //called by form component to set activeUser
    storeAndSetUser: function (result) {
      var storedUser = this.get('store').push('user', result.user);
      this.set('activeUser', storedUser);
      this.transitionToRoute("index"); 
    },
  }
});
