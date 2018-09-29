const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  dmo: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  type: {
    type: Number, // 0--单选  1--多选
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  ques_title: {
    type: String,
    required: true,
  },
  ques_options: [
    {
      id: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
    },
  ],
  answer: {
    type: Array,
    required: true,
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
    default: 'creator_01',
  },
  level: Number, // 选填
  chapter: Number, // 选填
  act_log: {
    type: Array,
  },
});
mongoose.set('useCreateIndex', true);
const questionModel = mongoose.model('question', questionSchema);

module.exports = questionModel;
