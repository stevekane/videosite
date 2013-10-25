var attr = DS.attr;

App.User = DS.Model.extend({
  password: attr(),
  email: attr(),
  subscribed: attr()
});
