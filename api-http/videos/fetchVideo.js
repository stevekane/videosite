var _ = require('lodash');
var videoFIXTURES = require('../../videos.js');

module.exports = function (req, res) {
  var requested = _.find(videoFIXTURES, {id: parseInt(req.params.id)});
  res.send({video: requested}); 
}
