var _ = require('lodash');

//takes a response object
var sendError = _.curry(function (res, err) {
  var message = (err instanceof Error) ? err.message : err; 
  console.log("sendError: ", message);
  return res.status(400).json({error: message});
});

function sendConfirmation (res) {
  return function () {
    console.log("sending confirmation");
    return res.send(204);
  }
}

//we curry the function to allow partial application
module.exports = {
  sendError: sendError,
  sendConfirmation: sendConfirmation
}
