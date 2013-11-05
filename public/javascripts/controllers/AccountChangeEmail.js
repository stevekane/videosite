var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangeEmailController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

  actions: {
  
    updateUser: function (user) {
      this.get('store').push("user", user);     
    }
  }

});
