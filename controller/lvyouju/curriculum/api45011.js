/**
 * 获取阶段课程配置详情 api45011
 */
const cmlvModel = require(`${process.cwd()}/mongodb/model/cmlv`);
const dmocmModel = require(`${process.cwd()}/mongodb/model/dmocm`);
const curriculumModel = require(`${process.cwd()}/mongodb/model/curriculum`);
const csmModel = require(`${process.cwd()}/mongodb/model/course_module`);
const qsmModel = require(`${process.cwd()}/mongodb/model/question_module`);

const moduleMap = async (module, model) => {
  const promise = module.map(async (_id) => {
    const res = await model.find({ _id });
    return res[0].data;
  });
  const result = await Promise.all(promise);
  return result;
};
const getDataCourseContent = async (course_content) => {
  const promise = course_content.map(async (val) => {
    const { course_module, question_module } = val;
    const newcsm = await moduleMap(course_module, csmModel);
    const newqsm = await moduleMap(question_module, qsmModel);
    return {
      course_module: newcsm,
      question_module: newqsm,
    };
  });
  const newcc = await Promise.all(promise);
  return newcc;
};
const api45011 = async (body) => {
  const {
    query: {
      id,
    } = {},
  } = body;
  const res = await cmlvModel.find({ _id: id });
  if (!res.length) {
    return {
      error_id: 'node_011',
      error_str: '无此课程',
    };
  }
  const resObject = res[0].toObject();
  const course_content = await getDataCourseContent(resObject.current.data.course_content);
  resObject.current.data.course_content = course_content;
  const { first_level, dmo, cmid } = resObject;
  resObject.id = resObject._id;
  delete resObject._id;
  if (first_level) {
    const dmocmRes = await dmocmModel.find({ dmo });
    const { global, cmid: gcmid } = dmocmRes[0];
    const cmRes = await curriculumModel.find({ id: cmid });
    const { curriculum_config: common } = cmRes[0];
    return {
      dmo_cm_first: gcmid === cmid,
      global,
      common,
      ...resObject,
    };
  }
  // 删除
  resObject.nav_struct.shift();
  return {
    ...resObject,
  };
};

module.exports = api45011;
