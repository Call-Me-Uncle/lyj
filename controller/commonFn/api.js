const userModal = require('../../mongodb/model/user');

const verifyAccount = ({ account, password }) => {
  const result = userModal.find({
    account,
    password,
  });
  console.log(result);
};

module.exports = { verifyAccount };
