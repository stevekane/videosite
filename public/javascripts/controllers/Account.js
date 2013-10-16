var alias = Ember.computed.alias;

App.AccountController = Ember.ObjectController.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content')

});
