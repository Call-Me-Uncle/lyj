/**
 * api45010 课程配置-新增/编辑
 */
const cmlvModel = require(`${process.cwd()}/mongodb/model/cmlv`);
const dmocmModel = require(`${process.cwd()}/mongodb/model/dmocm`);
const curriculumModel = require(`${process.cwd()}/mongodb/model/curriculum`);
const { updateCourseContentAndInsertmodule, setChapterSectionNum } = require('./utils');

const api45010 = async (body) => {
  const {
    query: {
      id: _id, global, common, current, nav_struct,
    } = {},
  } = body;
  const res = await cmlvModel.find({ _id });
  if (!res.length) {
    return {
      error_id: 'node_0100',
      error_str: '无此数据',
    };
  }
  const {
    first_level, dmo, name, template: rtemplate, cmid,
  } = res[0].toObject();
  let { nav_struct: rnav_struct } = res[0].toObject();
  if (first_level) {
    if (!global || !common) {
      return {
        error_id: 'node_0101',
        error_str: '字段不全',
      };
    }
    await dmocmModel.updateOne({ dmo }, { global });
    await curriculumModel.updateOne({ id: cmid }, { curriculum_config: common });
  }
  // let modifyIndex;
  // template.forEach((val, index) => {
  //   if (val.selected) {
  //     modifyIndex = index;
  //   }
  // });
  // rcurrent.config = current.config;
  const finalCurrent = await updateCourseContentAndInsertmodule({ current, name });
  if (first_level) {
    rnav_struct = nav_struct;
  } else {
    rnav_struct[1] = nav_struct[0];
  }
  await cmlvModel.updateOne({ _id }, {
    current: finalCurrent,
    template: rtemplate,
    nav_struct: rnav_struct,
  });
  // 不需要await, 不需要等待执行结果返回。异步更新即可
  setChapterSectionNum(cmid);
  return null;
};
module.exports = api45010;
