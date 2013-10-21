var wu = require("wu");

//we curry the function to allow partial application
module.exports = {
  sendError: wu.wu.autoCurry(sendError)
}

//takes a response object
function sendError (res, err) {
  var message = (err instanceof Error) ? err.message : err; 
  console.log("sendError: ", message);
  return res.send(400, {error: message});
}
