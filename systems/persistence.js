/*
This is a proxy to different persistence layers
All methods MUST return promises!
*/
module.exports = (function () {
  var persistenceLayer = require('../config/config.json').persistence;
  return require('./persistence/' + persistenceLayer);
})()
