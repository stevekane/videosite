var fetchVideos = require('./videos/fetchVideos')
  , fetchVideo = require('./videos/fetchVideo');

module.exports = function (app) {
 
  app.get("/videos", fetchVideos);
  app.get("/videos/:id", fetchVideo);
  return app;
}
