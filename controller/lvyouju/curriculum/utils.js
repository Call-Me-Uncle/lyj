const _ = require('lodash');

const csmModel = require(`${process.cwd()}/mongodb/model/course_module`);
const qsmModel = require(`${process.cwd()}/mongodb/model/question_module`);
const curriculumModel = require(`${process.cwd()}/mongodb/model/curriculum`);
const cmlvModel = require(`${process.cwd()}/mongodb/model/cmlv`);
const dmocmModel = require(`${process.cwd()}/mongodb/model/dmocm`);
const chapterModel = require(`${process.cwd()}/mongodb/model/chapter`);
const { generateId } = require(`${process.cwd()}/controller/commonFn/utils`);

const updateChapter = async ({ val, isNew }) => {
  const { id, course_module, question_module } = val;
  const data = {
    course_module: course_module.map(csmval => csmval.id),
    question_module: question_module.map(qsmval => qsmval.id),
  };
  if (isNew) {
    await chapterModel.updateOne({ id }, data);
  } else {
    await chapterModel.insertMany([{
      id,
      ...data,
    }]);
  }
  return null;
};

const updateCourseContentAndInsertmodule = async ({ current, name }) => {
  const { data: { course_content, chapter_list: { list, overview } }, config } = current;
  let section_num = 0;
  const promise = list.map(async (val, index) => {
    const { course_module = [], question_module = [], id } = val;
    const isNew = !!id;
    const chapter_id = id || generateId();
    val.id = chapter_id;
    section_num += course_module.length;
    const csmPromise = course_module.map(async (csmval, csmindex) => {
      const { id: _id } = csmval;
      const configData = config.map(cfval => ({
        course_module: cfval.course_content[index].course_module[csmindex],
      }));
      const data = course_content[index].course_module[csmindex];
      if (_id) {
        await csmModel.updateOne({ _id }, {
          config: configData,
          data,
        });
        course_content[index].course_module[csmindex] = _id;
      } else {
        const csmRes = await csmModel.insertMany([{
          config: configData,
          data,
          chapter_id,
        }]);
        const { _id: _id_csm } = csmRes[0].toObject();
        csmval.id = _id_csm;
        course_content[index].course_module[csmindex] = _id_csm;
      }
      return {};
    });
    await Promise.all(csmPromise);
    const qsmPromise = question_module.map(async (qsmval, qsmindex) => {
      const { id: _id } = qsmval;
      const qconfigData = config.map(qcfval => ({
        question_module: qcfval.course_content[index].question_module[qsmindex],
      }));
      const data = course_content[index].question_module[qsmindex];
      delete data.id;
      if (_id) {
        await qsmModel.updateOne({ _id }, {
          data,
          config: qconfigData,
        });
        course_content[index].question_module[qsmindex] = _id;
      } else {
        const qsmRes = await qsmModel.insertMany([{
          data,
          config: qconfigData,
          chapter_id,
        }]);
        const { _id: _id_qsm } = qsmRes[0].toObject();
        qsmval.id = _id_qsm;
        course_content[index].question_module[qsmindex] = _id_qsm;
      }
      return {};
    });
    await Promise.all(qsmPromise);
    // 异步更新即可
    updateChapter({ val, isNew });
    return {};
  });
  await Promise.all(promise);
  
  const chapter_num = list.length;
  Object.assign(overview, { section_num, chapter_num, name });
  
  return current;
};

const setChapterSectionNum = async (cmid) => {
  const res = await curriculumModel.find({ id: cmid });
  const { curriculum, dmo } = res[0];
  let chapter_num_total = 0;
  let section_num_total = 0;
  const promise = curriculum.map(async (val) => {
    const lvRes = await cmlvModel.find({ _id: val.id });
    const { overview: { chapter_num, section_num } } = lvRes[0].current.data.chapter_list;
    chapter_num_total += chapter_num;
    section_num_total += section_num;
    return null;
  });
  await Promise.all(promise);
  const dmocmRes = await dmocmModel.find({ dmo });
  const list = dmocmRes[0].global.data.course_list.list;
  list.forEach((lval) => {
    if (lval.id === cmid) {
      Object.assign(lval, {
        chapter_num: chapter_num_total,
        section_num: section_num_total,
      });
    }
  });
  await dmocmModel.updateOne({ dmo }, dmocmRes[0]);
};

const updateStageName = async (cmid, stageList) => {
  const res = await curriculumModel.find({ id: cmid });
  const curriculum = _.get(res, '[0].curriculum');
  const promise = curriculum.map(async (val, index) => {
    const stageName = _.get(stageList, `${index}.name`, '');
    const lvRes = await cmlvModel.find({ _id: val.id });

    _.set(lvRes, '[0].current.data.chapter_list.overview.name', stageName);
    await cmlvModel.updateOne({ _id: val.id }, lvRes[0]);

    const courseContent = _.get(lvRes, '[0].current.data.course_content');
    const courseConPromise = courseContent.map(async (itemContent) => {
      const questionModule = _.get(itemContent, 'question_module', []);
      const quesPromise = questionModule.map(async (ques) => {
        const quesRes = await qsmModel.find({ _id: ques });
        _.set(quesRes, '[0].data.head_title.stage', stageName);
        await qsmModel.updateOne({ _id: ques }, quesRes[0]);
        return null;
      });
      await Promise.all(quesPromise);
      return null;
    });
    await Promise.all(courseConPromise);
    return null;
  });
  await Promise.all(promise);
};

module.exports = {
  updateCourseContentAndInsertmodule,
  setChapterSectionNum,
  updateStageName,
};
