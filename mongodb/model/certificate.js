const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
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
  style: {
    id: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
    },
    levels: [
      {
        name: {
          type: String,
          required: true,
        },
        desc: String,
        desc_en: String,
      },
    ],
  },
  sign: {
    type: String,
  },
  range: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  memo: {
    type: String,
  },
  style_offline: {
    type: String,
  },
  stat: {
    type: String,
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
  act_log: {
    type: Array,
  },
});
mongoose.set('useCreateIndex', true);
const certificateModel = mongoose.model('certificate', certificateSchema);

module.exports = certificateModel;
