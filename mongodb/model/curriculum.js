/**
 * 课程列表
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const curriculumSchema = Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dmo: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  curriculum: [
    {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
      },
    },
  ],
  certificate_setting: {
    id: {
      type: String,
      required: true,
    },
  },
  stat: {
    type: Number,
    default: 0,
  },
  ctime: {
    type: Number,
    default: Date.now,
  },
  creator: {
    type: String,
    required: true,
  },
  curriculum_config: {
    type: Schema.Types.Mixed,
    default: {},
  },
});
mongoose.set('useCreateIndex', true);
const curriculumModel = mongoose.model('curriculum', curriculumSchema);

module.exports = curriculumModel;
