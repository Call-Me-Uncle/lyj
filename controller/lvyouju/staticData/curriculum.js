const _ = require('lodash');
/**
 * 课程证书和徽章配置和数据模板
 */

const stage_tmp = {
  data: {
    img: '', // 图片
    name: '', // 阶段名称
    chapter_num: 2, // 章节数
    section_num: 2, // 小节数
    id: '', // 课程阶段id
  },
  config: {
    control_id: 'C4',
    img: {
      can_hidden: true,
      visible: true,
      style: {},
    },
  },
};
const ctrule_tmp = {
  data: { // 证书规则
    name: '', // 证书名称
    star: -1, // 获得星星数
    finished_course: [], // 需完成的阶段
    paper_quality: 0, // 是否含有纸质证书
  },
};
const common = {
  data: {
    certificate: {
      stage_list: [{ // 阶段列表
        name: '', // 课程名称
        id: '', // 课程阶段id
      }],
      rules: [],
    },
    stage_list: { // 阶段列表
      header: {
        img: '', // 头部图片
        name: '', // 课程名称
        join: 0, // 参与数
        like: 0, // 点赞数
      },
      certificate_rules: {
        title: '获得证书规则',
        rules: [{ // 证书规则
          name: '', // 证书名称
          finished_course: [], // string 数组 需完成的阶段名称
        }],
      },
      list: [],
    },
  },
  config: {
    stage_list: { // 阶段列表默认配置
      header: {
        control_id: 'C3',
        img: {
          can_hidden: true,
          visible: true,
          style: {},
        },
      },
      certificate_rules: {
        control_id: 'C5',
        can_hidden: true,
        visible: true,
        alert_icon: {
          can_hidden: true,
          visible: true,
          type: 'guize',
          style: {
            font: 'c1',
            size: 21,
          },
        },
      },
      list: [],
    },
  },
};

module.exports = () => ({
  common: _.cloneDeep(common),
  stage_tmp: _.cloneDeep(stage_tmp),
  ctrule_tmp: _.cloneDeep(ctrule_tmp),
});
