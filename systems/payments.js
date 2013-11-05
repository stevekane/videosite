/*
This is a proxy to different payment services 
All methods MUST return promises!
*/
module.exports = (function () {
  var paymentService = require('../config/config.json').payments;
  return require('./payments/' + paymentService);
})()
