App.UserController = Ember.ObjectController.extend({

  //store the latest login info in localStorage for use on refresh
  storeInLocalStorage: function () {
    var user = this.get('content');
    var localStoredUser = user 
      ? {id: user.get('id'), email: user.get('email')}
      : null;

    App.localStore.set('user', localStoredUser);
  }.observes('content', 'content.email'),

  //this stored value is NOT overwritten and is used to store login info 
  //even when a user logs out.  This is used to pre-populate the login form
  storeLastKnownSession: function () {
    var user = this.get('content');

    if (user) {
      App.localStore.set('loginCredentials', {email: user.get('email')}); 
    }
  }.observes('content', 'content.email'),

  //fired on app bootup.  used to verify if a user should still be logged in
  restoreSession: function (store, optionalURL) {
    var self = this
      , url = optionalURL ? optionalURL : "user/restore"
      , method = "GET";

    return Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, method)
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
  },

  logout: function (store, optionalURL) {
    var self = this
      , url = optionalURL ? optionalURL : "user/logout"
      , method = "POST";

    return Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, method)
      .then(function () {
        self.set('content', null);
        self.transitionToRoute("index");
      })
      .fail(function (err) {
        alert('logout failed!');
      });
    });
  }

});
