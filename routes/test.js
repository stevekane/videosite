var fs = require('fs')
  , _ = require('lodash')
  , Q = require('q')
  , sendgrid = require('sendgrid')
  , callWithPromise = Q.ninvoke;

var streamIndex = _.curry(function (req, res) {
  return fs.createReadStream("./index.js").pipe(res);
});

var findFileIfExists = _.curry(function (fileName, files) {
  var fileExists = _.contains(files, fileName);
  if (!fileExists) { throw new Error("No File Found."); }
  return fileName;
});

var sendFileContent = _.curry(function (res, fileName) {
  return fs.createReadStream(fileName).pipe(res);
});

var streamFile = _.curry(function (req, res) {
  var requestedFile = req.body.fileName;
  if (!requestedFile) { return res.send(400, "No filename provided.");}
  callWithPromise(fs, "readdir", "./")
  .then(findFileIfExists(requestedFile))
  .then(sendFileContent(res))
  .fail(function (err) {
    console.log(err.message);
    res.send(400, err.message);
  })
  .done();
  
});

var sendTestEmail = _.curry(function (req, res) {
});


exports.configure = function (app) {
 
  app.get('/test', streamIndex);
  app.post('/peek', streamFile);
  app.post('/email/test', sendTestEmail);

}
