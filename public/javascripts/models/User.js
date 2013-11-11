var attr = DS.attr;

App.User = DS.Model.extend({
  password: attr(),
  email: attr(),
  subscription_id: attr(),
  subscribed: Ember.computed.bool("subscription_id")
});
