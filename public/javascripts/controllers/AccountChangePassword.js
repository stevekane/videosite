var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountChangePasswordController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

});
