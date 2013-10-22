var attr = DS.attr;

App.User = DS.Model.extend({
  password: attr(),
  email: attr(),
});

App.UserAdapter = DS.RESTAdapter.extend({
  restoreSession: function (store) {
    var self = this
      , url = "user/restore";

    var sessionPromise = Ember.RSVP.Promise(function (resolve, reject) {
      self.ajax(url, "GET")
      .then(function (payload) {
        if (payload) {
          newUser = store.push("user", payload.user); 
          return resolve(newUser);
        } else {
          resolve(null); 
        }
      })
      .fail(function (err) {
        return resolve(null);   
      });
    });

    return sessionPromise;
  }
});
