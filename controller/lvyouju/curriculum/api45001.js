/**
 * 新建/编辑课程
*/
const _ = require('lodash');

const curriculumModel = require(`${process.cwd()}/mongodb/model/curriculum`);
const cmlvModel = require(`${process.cwd()}/mongodb/model/cmlv`);
const dmocmModel = require(`${process.cwd()}/mongodb/model/dmocm`);
const certificateModel = require(`${process.cwd()}/mongodb/model/certificate`);
const { global, cm_list_tmp } = require(`${process.cwd()}/controller/lvyouju/staticData/dmo`)();
const { level: lvBase } = require(`${process.cwd()}/controller/lvyouju/staticData/level`)();
const cmBase = require(`${process.cwd()}/controller/lvyouju/staticData/curriculum`)();
const { updateCourseContentAndInsertmodule, setChapterSectionNum, updateStageName } = require('./utils');

/**
 * 更新dmocm
 * 1 查询不到旅游局,为新增
 * 2 查询到，并且当前课程已存在，则更新名称
 * 3 查询到，当前课程不存在， 将课程信息插入到旅游局课程列表
 */
async function updateDmocm({
  dmo, cmid, name, certificateName,
}) {
  const dmo_cm = await dmocmModel.find({ dmo });
  if (dmo_cm.length) {
    const cmdList = dmo_cm[0].global.data.course_list.list;
    const cmcList = dmo_cm[0].global.config.course_list.list;
    const thisCm = cmdList.find(val => val.id === cmid);
    // 2
    if (thisCm) {
      thisCm.name = name;
      thisCm.certificate_name = certificateName;
    } else {
      // 3
      const { data, config } = cm_list_tmp;
      cmdList.push({
        ...data,
        name,
        id: cmid,
        certificate_name: certificateName,
      });
      cmcList.push(config);
    }
    await dmocmModel.updateOne({ dmo }, dmo_cm[0]);
  } else {
    // 1
    const lv = global.data.course_list.list[0];
    Object.assign(lv, { name, id: cmid });
    await dmocmModel.insertMany({
      dmo,
      global,
      cmid,
    });
  }
}
/**
* 更新cmlv
*/
async function updateLv({
  val, first_level, dmo, cmid,
}) {
  const { id, name } = val;
  if (!id) {
    const lvBaseCopy = _.cloneDeep(lvBase);
    const result = await updateCourseContentAndInsertmodule({ current: lvBaseCopy.current, name });
    lvBaseCopy.current = result;
    const res = await cmlvModel.insertMany([
      {
        name,
        first_level,
        dmo,
        cmid,
        ...lvBaseCopy,
      },
    ]);
    const { _id } = res[0].toObject();
    return {
      id: _id,
      name,
    };
  }
  await cmlvModel.updateOne({ _id: id }, { name });
  return val;
}

/**
 *更新dmocm, cmlv, 并返回最新的带id的课程阶段列表
*/
async function cmConfig({
  curriculum, dmo, cmid, name, certificateName,
}) {
  await updateDmocm({
    dmo, cmid, name, certificateName,
  });
  const newcmPromise = curriculum.map(async (val, index) => {
    const res = await updateLv({
      first_level: index === 0,
      val,
      dmo,
      cmid,
    });
    return res;
  });
  const newcm = await Promise.all(newcmPromise);
  return newcm;
}

const api45001Error = ({ query: { curriculum, type }, ctRes }) => {
  if (!curriculum.length) {
    return {
      error_id: 'node_0010',
      error_str: '课程阶段不能为空',
    };
  }
  if (ctRes[0].type !== type) {
    return {
      error_id: 'node_0102',
      error_str: '证书类型和课程类型不符',
    };
  }
  return false;
};

/**
 * 新增，将数据插入，返回查询结果
 * 数据存在，查询后返回结果
 */
const getCmRes = async ({ creator, query, isCreate }) => {
  let res;
  const { id } = query;
  if (isCreate) {
    const all = await curriculumModel.find() || [];
    res = await curriculumModel.insertMany([Object.assign(query, {
      creator,
      id: all.length + 1,
    })]);
  } else {
    /**
     * 判断数据id是否为当前库中存在数据。不存在直接返回错误
     */
    const hset = await curriculumModel.find({ id });
    if (!hset) {
      return {
        error_id: 'node_002',
        error_str: '无此条数据',
      };
    }
    res = await curriculumModel.find({ id });
  }
  return res;
};
const getStageList = ({ newcm = [], curriculum_config }) => {
  const { stage_tmp } = _.cloneDeep(cmBase);
  const data_sl_list = [];
  const config_sl_list = [];
  
  const original_data_sl_list = _.get(curriculum_config, 'data.stage_list.list', []);
  const original_config_sl_list = _.get(curriculum_config, 'config.stage_list.list', []);
  
  _.each(newcm, (val) => {
    const { id, name } = val;
    const dsl_same = original_data_sl_list.find(cval => cval.id === id);
    const dsl_same_idx = original_data_sl_list.findIndex(cval => cval.id === id);
    if (dsl_same) {
      // const csl_same = original_config_sl_list.find(cval => cval.id === id);
      const csl_same = dsl_same_idx >= 0 ? original_config_sl_list[dsl_same_idx] : {};
      data_sl_list.push({
        ...dsl_same,
        name,
      });
      config_sl_list.push({
        ...csl_same,
        // name,
      });
    } else {
      data_sl_list.push({
        ...stage_tmp.data,
        ...val,
      });
      config_sl_list.push({
        ...stage_tmp.config,
      });
    }
  });
  return {
    data_sl_list,
    config_sl_list,
  };
};
const getCertificateConfig = ({ ctRes, isCreate, isChange, data_sl_list, curriculum_config }) => {
  const { ctrule_tmp } = _.cloneDeep(cmBase);
  const certificate = {};
  // 更新证书规则和可选的课程阶段
  if (isCreate || isChange) {
    const { style: { levels } } = ctRes[0].toObject();
    const ctRules = levels.map((val) => {
      const { name, _id } = val;
      return {
        ...ctrule_tmp.data,
        name,
        id: _id,
      };
    });
    certificate.rules = ctRules;
  } else {
    certificate.rules = curriculum_config.data.certificate.rules;
  }
  certificate.stage_list = data_sl_list;
  return certificate;
};
/**
 * 新增课程，结合模板填充curriculumConfig
 * 阶段列表 除了影响列表数据，还影响证书规则中的可选阶段列表
 */
const getNewcurriculumConfig = async ({ newcm, ctRes, curriculum_config, isCreate, isChange, name, id }) => {
  const { common } = _.cloneDeep(cmBase);
  if (isCreate || isChange) {
    const certificateArr = await certificateModel.find({ _id: id });
    const certificate = certificateArr[0];
    const levels = certificate.style.levels;
    const rules = levels.map((item) => {
      const ruleItem = { name: item.name, finished_course: [] };
      return ruleItem;
    });
    common.data.stage_list.certificate_rules.rules = rules;
  }
  const res = (isCreate || isChange) ? common : curriculum_config;

  const { data_sl_list, config_sl_list } = getStageList({ newcm, curriculum_config });

  _.set(res, 'data.stage_list.header.name', name);
  res.data.stage_list.list = data_sl_list;
  res.config.stage_list.list = config_sl_list;
  res.data.certificate = getCertificateConfig({ ctRes, isCreate, isChange, data_sl_list, curriculum_config });
  return res;
};

const api45001 = async (body) => {
  // 验证登录状态 （todo）
  // 验证是否有创建权限 （todo）
  
  const { csuid: creator, query = {} } = body;
  query.id = parseInt(query.id, 10);
  const { id, certificate_setting, name, curriculum: stageList } = query;
  const isCreate = !id;
  const ctRes = await certificateModel.find({ _id: certificate_setting.id });
  const isChange = !!(id) && !(stageList[0].id);

  // 判错
  const err = api45001Error({ query, ctRes });
  if (err) { return err; }
  // 获取插入的curriculum
  const res = await getCmRes({ creator, query, isCreate });
  if (res.error_id) { return res; }
  const { id: cmid, curriculum_config } = res[0];

  // 将课程阶段更新，并返回带id的课程阶段列表
  const certificateName = _.get(ctRes[0].toObject(), 'name', '');
  const newcm = await cmConfig({
    ...query,
    cmid,
    certificateName,
  });
  const curriculumConfig = await getNewcurriculumConfig({
    newcm, ctRes, curriculum_config, isCreate, isChange, name, id: certificate_setting.id,
  });
  await curriculumModel.updateOne({ id: cmid }, {
    curriculum: newcm,
    name,
    certificate_name: certificateName,
    curriculum_config: curriculumConfig,
  });
  // 不需要await, 不需要等待执行结果返回。异步更新即可
  setChapterSectionNum(cmid);
  // 更新阶段名称
  updateStageName(cmid, stageList);
  return {
    id: cmid,
  };
};
module.exports = api45001;
