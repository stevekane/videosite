var mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp')
  , promises = require('../../../libs/mongoose-promises');

var VideoSchema = new mongoose.Schema({
  
  title: String,
  description: String,
  mp4_url: String,
  webm_url: String,
  publication_date: Date,
  duration: Number,
  keywords: String,
  slug: String,

});

VideoSchema.plugin(timestamps);
VideoSchema.plugin(promises);

var Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
