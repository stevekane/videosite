App.VideosRoute = Ember.Route.extend({

  model: function (params) {
    var store = this.get('store');

    return store.find("video");
  }

});
