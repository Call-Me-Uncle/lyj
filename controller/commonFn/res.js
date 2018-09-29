const _ = require('lodash');

// 获取基础返回数据
const getBaseData = () => {
  const base = {
    error: {
      error_id: 0,
      error_str: '',
    },
  };
  return _.cloneDeep(base);
};
/**
 * 将处理结果和基础返回数据进行合并
 * 外面数据处理，直接返回 error 或 data。在此处进行判断并与base进行合并
*/
const mergeRes = (data) => {
  const { error_id } = data || {};
  const base = getBaseData();
  if (typeof error_id !== 'undefined') {
    return _.merge(base, { error: data });
  }
  return _.merge(base, { data });
};

module.exports = { getBaseData, mergeRes };
