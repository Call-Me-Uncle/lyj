const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    index: 1,
  },
  name: String,
});
mongoose.set('useCreateIndex', true);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
