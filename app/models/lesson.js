var mongoose = require('mongoose')
  , timestamps = require('mongoose-timestamp');

var LessonSchema = new mongoose.Schema({

});

//adds createdAt/updatedAt fields
LessonSchema.plugin(timestamps);

exports.Lesson = mongoose.model("Lesson", LessonSchema);
