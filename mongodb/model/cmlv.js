/**
 * 课程阶段列表
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const cmlvSchema = new Schema({
  first_level: {
    type: Boolean,
    default: false,
  },
  name: String,
  dmo: String,
  cmid: Number,
  current: Schema.Types.Mixed,
  template: Schema.Types.Mixed,
  nav_struct: Schema.Types.Mixed,
});
mongoose.set('useCreateIndex', true);
const cmlvModel = mongoose.model('cmlv', cmlvSchema);

module.exports = cmlvModel;
