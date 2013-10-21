var _ = require('lodash');

//we curry the function to allow partial application
module.exports = {
  sendError: _.curry(sendError),
  sendConfirmation: sendConfirmation
}

//takes a response object
function sendError (res, err) {
  var message = (err instanceof Error) ? err.message : err; 
  console.log("sendError: ", message);
  return res.send(400, {error: message});
}

function sendConfirmation (res) {
  console.log("sending confirmation");
  return res.send(204);
}
