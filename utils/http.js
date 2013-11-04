var _ = require('lodash');

//takes a response object
module.exports.sendError = _.curry(function (res, err) {
  var message = (err instanceof Error) ? err.message : err; 

  console.log("sendError: ", err.stack);
  return res.status(400).json({error: message});
});

module.exports.sendConfirmation = function (res) {
  return function () {
    console.log("sending confirmation");
    return res.send(204);
  }
}

//we return by convention of typeName and also ensure that
//password and other sensitive fields are not returned
module.exports.returnByType = _.curry(function (res, type, data) {
  var dataCopy = _.clone(data)
    , json = {};

  delete dataCopy.password;
  delete dataCopy.temporary_password;
  json[type] = dataCopy;
  return res.send(json);
});
