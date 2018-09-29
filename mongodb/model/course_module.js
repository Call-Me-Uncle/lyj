/**
 * 课程阶段列表
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const csmSchema = new Schema({
  data: Schema.Types.Mixed,
  config: Schema.Types.Mixed,
  chapter_id: {
    type: String,
    require: true,
  },
});
mongoose.set('useCreateIndex', true);
const csmModel = mongoose.model('course_module', csmSchema);

module.exports = csmModel;
