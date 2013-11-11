App.VideosRoute = Ember.Route.extend({

  model: function (params) {
    var store = this.get('store');
    var fixtures = App.Video.FIXTURES; 
    return store.pushMany("video", fixtures);
  },

});
