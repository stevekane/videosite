var attr = DS.attr;

App.User = DS.Model.extend({
  
  username: attr(),
  password: attr(),
  email: attr(),
});
