App.UserController = Ember.ObjectController.extend({

  //store the latest login info in localStorage for use on refresh
  storeInLocalStorage: function () {
    var user = this.get('content');
    var localStoredUser = user 
      ? {id: user.get('id'), email: user.get('email')}
      : null;

    App.localStore.set('user', localStoredUser);
  }.observes('content', 'content.email'),

  //fired on app bootup.  used to verify if a user should still be logged in
  restoreSession: function (store) {
    var self = this
      , url = "user/restore";

    var sessionPromise = Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, "GET")
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
