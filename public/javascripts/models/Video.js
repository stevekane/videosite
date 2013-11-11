var attr = DS.attr;

App.Video = DS.Model.extend({
  
  title: DS.attr(),
  description: DS.attr(),
  transcript: DS.attr(),
  mp4_url: DS.attr(),
  webm_url: DS.attr(),
  publication_date: DS.attr(),
  duration: DS.attr(),
  keywords: DS.attr(),
  slug: DS.attr()

});
