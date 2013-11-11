App.VideoRoute = Ember.Route.extend({

  model: function (params) {
    var store = this.get('store');
    var fixtures = App.Video.FIXTURES
      , thisVideo = fixtures.findBy("slug", params.video_slug);

    return store.push("video", thisVideo);
  },

  serialize: function (model) {
    return {video_slug: model.get('slug')}; 
  },

});
