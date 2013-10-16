var alias = Ember.computed.alias
  , set = Ember.set;

App.AccountController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

});
