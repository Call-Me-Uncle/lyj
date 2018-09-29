const mongoose = require('mongoose');

const dmoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  ptid: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  country: {
    type: Array,
    required: true,
  },
  continent: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  type: {
    type: Number,
    required: true,
  },
  order_num: {
    type: Number,
  },
  logo: {
    type: String,
    required: true,
  },
  office_address: {
    type: String,
  },
  memo: {
    type: String,
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
  act_log: {
    type: Array,
  },
});
mongoose.set('useCreateIndex', true);
const dmoModel = mongoose.model('dmo', dmoSchema);

module.exports = dmoModel;
