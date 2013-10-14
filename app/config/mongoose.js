exports.configure = function (mongoose, url) {

  mongoose.connect(url, function (err) {
    if (err) throw err; 

    console.log('successfully connected to', url);
  });

}
