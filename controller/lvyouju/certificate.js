const certificateModel = require(`${process.cwd()}/mongodb/model/certificate`);
// const dmoModel = require(`${process.cwd()}/mongodb/model/dmo`);
// const fs = require('fs');

const certificatetest = async () => ({ mes: '证书测试接口' });
/**
 * 课程页获取证书列表
 */
const api45022 = async (body) => {
  const { query = {} } = body;
  const { dmo } = query;
  let res;
  if (dmo) {
    res = await certificateModel.find({ dmo });
  } else {
    res = await certificateModel.find({});
  }
  const data = res.map(item => ({ id: item._id, name: item.name }));
  return { list: data };
};
/**
 * 生成证书JSON文件
 */
// const createCertificateJSON = async () => {
//   const dmoRes = await dmoModel.find({});
//   const certificateRes = await certificateModel.find({});
//   const nameObj = {};
// };

module.exports = {
  certificatetest, api45022,
};
