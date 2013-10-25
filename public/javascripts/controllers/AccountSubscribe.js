var set = Ember.set
  , alias = Ember.computed.alias;

App.AccountSubscribeController = Ember.Controller.extend({
  
  needs: ['user'],

  content: alias('controllers.user.content'),

});
