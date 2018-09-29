const _ = require('lodash');

const cm_list_tmp = {
  data: { // 课程列表
    img: '', // 课程图片
    name: '', // 课程名称
    chapter_num: 0, // 章节数
    section_num: 0, // 小节数
    certificate_name: '', // 证书名称
    certificate_icon: 'mapfw', // 证书icon,
    id: '', // 课程id
  },
  config: {
    control_id: 'C2',
    img: {
      can_hidden: true,
      visible: true,
      style: {},
    },
    icon: {
      can_hidden: true,
      visible: true,
      type: 'zhengshu',
      style: {
        font: 'c3',
        size: 18,
      },
    },
  },
};

const global = {
  data: {
    course_list: {
      header: { // 课程列表
        img: '', // 旅游局默认图片
        name: '在线培训计划', // 小程序名称
        join: 0, // 参与数
        like: 0, // 点赞数
      },
      list: [_.cloneDeep(cm_list_tmp.data)],
    },
    // badge: [{ // 徽章规则
    //   img: '', // 徽章图片
    //   title: '最强大脑', // 徽章名称
    //   rule: { // 徽章规则
    //     type: 0, // 0: 最强大脑，1:超级学霸 2: 佛系学院
    //     num: 20, // 答对题数／学习课程数
    //   },
    // }],
  },
  config: {
    color_config: ['#D20B12', '#2F2F2F', '#888C8F', '#D4D4D4', '#F4F4F4', '#FAFAFA', '#FFFFFF'], // 已选配色方案
    course_list: { // 课程列表默认配置
      header: {
        control_id: 'C1',
        img: {
          can_hidden: true,
          visible: true,
          style: {},
        },
      },
      list: [_.cloneDeep(cm_list_tmp.config)],
    },
    // badge: [{ // 徽章默认配置
    //   control_id: 'C020',
    //   can_hidden: true,
    //   visible: true,
    //   title: {
    //     style: {
    //       fontSize: '27px',
    //       fontWeight: '600',
    //       font: 'c1',
    //       textAlign: 'center',
    //     },
    //   },
    //   img: {
    //     style: {
    //       width: 172,
    //       height: 172,
    //     },
    //   },
    // }],
  },
};


module.exports = () => ({
  global: _.cloneDeep(global),
  cm_list_tmp: _.cloneDeep(cm_list_tmp),
});
