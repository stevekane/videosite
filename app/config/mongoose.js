exports.configure = function (mongoose) {
  var url = "mongodb://localhost:27017/videosite";

  mongoose.connect(url, function (err) {
    if (err) throw err; 

    console.log('successfully connected to', url);
  });

}
