/*
This is a proxy to different email services
All methods MUST return promises!
*/
module.exports = (function () {
  var emailService = require('../config/config.json').email;
  return require('./email/' + emailService);
})()
