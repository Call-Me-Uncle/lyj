/**
 * 课程阶段列表
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const qsmSchema = new Schema({
  data: Schema.Types.Mixed,
  config: Schema.Types.Mixed,
  chapter_id: {
    type: String,
    require: true,
  },
});
mongoose.set('useCreateIndex', true);
const qsmModel = mongoose.model('question_module', qsmSchema);

module.exports = qsmModel;
