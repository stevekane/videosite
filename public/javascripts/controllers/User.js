App.UserController = Ember.ObjectController.extend({

  storeInLocalStorage: function () {
    var user = this.get('content');
    App.localStore.set('user', {
      id: user.get('id'),
      username: user.get('username'),
      email: user.get('email')
    });
    console.log('User ', user.get('username'), ' stored in localStorage!');
  }.observes('content')

});
