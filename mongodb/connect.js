const mongoose = require('mongoose');

// 'mongodb://root:miojiqiangmima@10.19.4.40:27017/lvyouju?authSource=admin'
const MONGO_URL = 'mongodb://root:miojiqiangmima@10.19.4.40:27017/lvyouju?authSource=admin';
console.log(MONGO_URL);
module.exports = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log('mongodb connected');
  });
};
