var set = Ember.set
  , alias = Ember.computed.alias;

App.SignupController = Ember.Controller.extend({

  needs: ['user'],

  activeUser: alias('controllers.user.content'),

  actions: {
    storeAndSetUser: function (user) {
      var storedUser = this.get('store').push('user', user);
      this.set('activeUser', storedUser);
      this.transitionToRoute("index"); 
    },
  }

});
