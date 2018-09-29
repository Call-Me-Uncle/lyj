const questionModel = require(`${process.cwd()}/mongodb/model/question`);
const tourismFilter = require('./mockData/lvyouju');
const tourismName = require('./mockData/lvyouju.json');

/**
 * 新增/编辑试题
 */
const api45005 = async (body) => {
  const { csuid: creator, query = {} } = body;
  const { id } = query;
  if (!id) {
    const all = await questionModel.find() || [];
    await questionModel.insertMany([Object.assign(query, {
      creator,
      id: all.length + 1,
    })]);
    return null;
  }
  const res = await questionModel.find({ id });
  if (!(res && res.length)) {
    return {
      error_id: 'node_002',
      error_str: '无此条数据',
    };
  }
  const data = await questionModel.update({ id }, query);
  return data;
};
/**
 * 获取试题详情
 */
const api45006 = async (body) => {
  const id = body.query.id || 0;
  if (!id) {
    return {
      error_id: 'node_003',
      error_str: '需要传入id',
    };
  }
  const res = await questionModel.find({ id });
  if (!(res && res.length)) {
    return {
      error_id: 'node_004',
      error_str: '传入错误id值',
    };
  }
  const data = res[0];
  const {
    dmo, batch, type, difficulty, ctime, ques_title, ques_options, answer, act_log = [],
  } = data;
  return {
    id,
    content: {
      dmo: { id: dmo, name: tourismName[dmo] },
      batch,
      type,
      difficulty,
      ctime,
      ques_title,
      ques_options,
      answer,
    },
    act_log,
  };
};
/**
 * 获取试题列表
 */
const api45015 = async (body) => {
  const { filter = {}, page = 0, page_cnt = 5 } = body.query;
  const {
    key, date_range, ques_title: ques_title_filter, batch: batch_filter,
  } = filter;

  if (date_range) {
    filter.ctime = { $gte: date_range.start, $lt: date_range.end };
  }
  delete filter.date_range;
  delete filter.key;
  delete filter.ques_title;
  delete filter.batch;
  filter.type === -1 && delete filter.type;
  filter.difficulty === -1 && delete filter.difficulty;
  let res = await questionModel.find(filter);

  if (key && key.trim()) {
    const numberRegex = /^\d+$/g;
    const keyword = key.trim();
    let tempRes;
    if (numberRegex.test(keyword)) {
      const id = parseInt(key, 10);
      const nameRegex = new RegExp(keyword);
      tempRes = res.filter(item => (
        item.id === id || nameRegex.test(item.batch) || nameRegex.test(item.ques_title)
      ));
    } else {
      const keywordRegex = /[^\s]+/g;
      const keywordArr = keyword.match(keywordRegex);
      let keywordStr = '';
      for (let i = 0; i < keywordArr.length; i += 1) {
        keywordStr = `${keywordStr}.*${keywordArr[i]}`;
        if (i === keywordArr.length - 1) {
          keywordStr += '.*';
        }
      }
      const nameRegex = new RegExp(keywordStr);
      tempRes = res.filter(item => (nameRegex.test(item.batch) || nameRegex.test(item.ques_title)));
    }
    res = tempRes;
  }
  if (ques_title_filter && ques_title_filter.trim()) {
    const titleRegex = new RegExp(ques_title_filter.trim());
    const tempRes = res.filter(item => titleRegex.test(item.ques_title));
    res = tempRes;
  }
  if (batch_filter && batch_filter.trim()) {
    const batchRegex = new RegExp(batch_filter.trim());
    const tempRes = res.filter(item => batchRegex.test(item.batch));
    res = tempRes;
  }

  const startIndex = page * page_cnt;
  const endIndex = startIndex + page_cnt;
  const total = res.length;
  res = res.slice(startIndex, endIndex);

  const list = res.map((item) => {
    const {
      id, ques_title, type, batch, ctime, difficulty, stat, dmo,
    } = item;
    return {
      id,
      ques_title,
      type,
      batch,
      ctime,
      difficulty,
      stat,
      dmo: { id: dmo, name: tourismName[dmo] },
    };
  });

  return { total, list, filter: { dmo: tourismFilter } };
};
/**
 * 更新试题状态
 */
const api45008 = async (body) => {
  const { id, stat } = body.query || {};
  if (!(id && stat)) {
    return {
      error_id: 'node_003',
      error_str: '参数不完整',
    };
  }
  const res = await questionModel.find({ id });
  if (!(res && res.length)) {
    return {
      error_id: 'node_002',
      error_str: '无此条数据',
    };
  }
  const data = await questionModel.update({ id }, { stat });
  return data;
};
/**
 * 获取试题批次列表
 */
const api45009 = async () => {
  const res = await questionModel.find({});
  const array = [];
  const obj = {};
  res.forEach((item) => {
    if (!(item.batch in obj)) {
      obj[item.batch] = true;
      array.push(item.batch);
    }
  });
  return array;
};
/**
 * 查找试题(id数组)
 */
const api45020 = async (body) => {
  const { ids } = body.query || {};
  if (!(ids && ids.length)) {
    return {
      error_id: 'node_003',
      error_str: '参数不完整',
    };
  }
  const res = await questionModel.find({ id: { $in: ids } });
  const list = res.map((item) => {
    const {
      id, ques_title, type, batch, ctime, difficulty, answer, ques_options,
    } = item;
    const options = ques_options.map((option) => {
      const { id: option_id, desc } = option;
      return { id: option_id, desc };
    });
    return {
      id, ques_title, type, batch, ctime, difficulty, answer, ques_options: options,
    };
  });
  return { list };
};

module.exports = {
  api45005, api45006, api45015, api45008, api45009, api45020,
};
