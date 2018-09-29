const dmoModel = require(`${process.cwd()}/mongodb/model/dmo`);
// const fs = require('fs');

const dmotest = async () => ({ msg: '旅游局测试接口' });
/**
 * 课程页旅游局列表
 */
const api45014 = async () => {
  const res = await dmoModel.find({});
  const data = res.map(item => ({
    id: item.ptid,
    name: item.name,
  }));
  return { list: data };
};
/**
 * 获取旅游局列表
 */
// const api45078 = async (body) => {
//   const { filter = {}, page = 0, page_cnt = 5 } = body;
//   const { key, date_range } = filter;
//   if (date_range) { // 包含起始时间，不包含结束时间
//     filter.ctime = { $gte: date_range.start, $lt: date_range.end };
//   }
//   delete filter.date_range;
//   delete filter.key;
//   const res = await dmoModel.find(filter);
// };
/**
 * 生成旅游局JSON文件
 */
// const createDmoJSON = async () => {
//   const res = await dmoModel.find({});
//   const nameObj = {};
//   const filter = res.map((item) => {
//     const { _id, name } = item;
//     nameObj[_id] = name;
//     return { id: _id, name };
//   });
//   fs.writeFile(
//     'controller/lvyouju/mockData/dmoFilter.json',
//     JSON.stringify(filter, null, 2),
//     (err) => {
//       if (err) {
//         return {
//           error_id: 'node_004',
//           msg: '文件写入错误',
//         };
//       }
//     },
//   );
//   fs.writeFile(
//     'controller/lvyouju/mockData/dmoName.json',
//     JSON.stringify(nameObj, null, 2),
//     (err) => {
//       if (err) {
//         return {
//           error_id: 'node_004',
//           msg: '文件写入错误',
//         };
//       }
//     },
//   );
// };

module.exports = {
  dmotest, api45014,
};
