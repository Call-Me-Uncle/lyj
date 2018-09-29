/**
 * 旅游局全局配置
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const dmocmSchema = new Schema({
  dmo: {
    type: String,
    required: true,
    unique: true,
  },
  global: Schema.Types.Mixed,
  cmid: Number,
});
mongoose.set('useCreateIndex', true);
const dmocmModel = mongoose.model('dmocm', dmocmSchema);

module.exports = dmocmModel;
