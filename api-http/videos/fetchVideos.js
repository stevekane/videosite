var videoFIXTURES = require('../../videos.js');

module.exports = function (req, res) {
  res.send({videos: videoFIXTURES}); 
}
