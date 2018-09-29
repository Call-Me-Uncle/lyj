const mongoose = require('mongoose');

const { Schema } = mongoose;
const chapterSchema = new Schema({
  course_module: Schema.Types.Mixed,
  question_module: Schema.Types.Mixed,
  id: {
    type: String,
    require: true,
    unique: true,
  },
});
mongoose.set('useCreateIndex', true);
const chapterModel = mongoose.model('chapter', chapterSchema);

module.exports = chapterModel;
