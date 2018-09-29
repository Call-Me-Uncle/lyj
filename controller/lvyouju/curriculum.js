/**
 * 课程管理接口，
 * api450开头
 */
const curriculumModel = require(`${process.cwd()}/mongodb/model/curriculum`);
const tourismFilter = require('./mockData/lvyouju');
const creatorFilter = require('./mockData/creator');
const tourismName = require('./mockData/lvyouju.json');
const creatorName = require('./mockData/creator.json');
const certificateName = require('./mockData/zhengshu.json');
const { numberToDate } = require('../../utils');


/**
 * 获取课程详情页
 */
const api45002 = async (body) => {
  const { query = {} } = body;
  const { id } = query;
  if (!id) {
    return {
      error_id: 'node_003',
      error_str: '参数不完整',
    };
  }
  const idObj = {
    id: parseInt(id, 10),
  };
  const res = await curriculumModel.find(idObj);
  if (!(res && res.length)) {
    return {
      error_id: 'node_002',
      error_str: '无此条数据',
    };
  }
  const data = res[0];
  const {
    type, name, dmo, curriculum, certificate_setting: certificate, act_log = [],
  } = data.toObject();
  const newcm = curriculum.map((val) => {
    delete val._id;
    return val;
  });
  return {
    id,
    content: {
      id,
      type,
      name,
      curriculum: newcm,
      certificate_setting: { id: certificate.id, name: certificateName[certificate.id] },
      dmo: { id: dmo, name: tourismName[dmo] },
    },
    act_log,
  };
};
/**
 * 获取课程列表
 */
const api45003 = async (body) => {
  const { filter = {}, page = 0, page_cnt = 5 } = body.query || {};
  const { key, date_range } = filter;

  if (date_range && date_range.start && date_range.end) { // 包含起始时间，不包含结束时间
    filter.ctime = { $gte: date_range.start, $lt: date_range.end + 86400000 };
  }
  filter.dmo || delete filter.dmo;
  filter.creator || delete filter.creator;
  filter.type === -1 && delete filter.type;
  filter.stat === -1 && delete filter.type;
  delete filter.date_range;
  delete filter.key;
  let res = await curriculumModel.find(filter).sort({ id: -1 });

  if (key && key.trim()) {
    const numberRegex = /^\d+$/g;
    const keyword = key.trim();
    let tempRes;
    if (numberRegex.test(keyword)) {
      const id = parseInt(key, 10);
      const nameRegex = new RegExp(keyword);
      tempRes = res.filter(item => (item.id === id || nameRegex.test(item.name)));
    } else {
      const nameRegex = new RegExp(keyword);
      tempRes = res.filter(item => nameRegex.test(item.name));
    }
    res = tempRes;
  }

  const startIndex = page * page_cnt;
  const endIndex = startIndex + page_cnt;
  const total = res.length;
  res = res.slice(startIndex, endIndex);

  const list = res.map((item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    delete newItem._id;
    delete newItem.curriculum;
    delete newItem.curriculum_config;
    delete newItem.certificate_setting;
    newItem.creator = creatorName[newItem.creator];
    newItem.ctime = numberToDate(newItem.ctime);
    newItem.dmo = { id: newItem.dmo, name: tourismName[newItem.dmo] };
    return newItem;
  });
  return { total, list, filter: { dmo: tourismFilter, creator: creatorFilter } };
};
/**
 * 更新课程状态
 */
const api45004 = async (body) => {
  const { id, stat } = body.query || {};
  if (!(id && stat)) {
    return {
      error_id: 'node_003',
      error_str: '参数不完整',
    };
  }
  const res = await curriculumModel.find({ id });
  if (!(res && res.length)) {
    return {
      error_id: 'node_002',
      error_str: '无此条数据',
    };
  }
  await curriculumModel.updateOne({ id }, { stat });
  return {
    msg: '状态更新成功',
  };
};

module.exports = {
  api45002, api45003, api45004,
};
