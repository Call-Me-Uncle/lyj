const _ = require('lodash');

const course_module_tmp = {
  data: [],
  config: [
    // {
    //   control_id: 'C015',
    //   can_hidden: true,
    //   visible: true,
    //   title: {
    //     visible: true,
    //     style: {
    //       fontSize: '24px',
    //       fontWeight: '600',
    //       font: 'c2',
    //       textAlign: 'center',
    //     },
    //   },
    // },
    // {
    //   control_id: 'C014',
    //   can_hidden: true,
    //   visible: true,
    //   audio: {
    //     visible: true,
    //     style: {},
    //   },
    // },
    // {
    //   control_id: 'C016',
    //   can_hidden: true,
    //   visible: true,
    //   head_bg: {
    //     visible: true,
    //     style: {
    //       bg: 'c5',
    //     },
    //   },
    //   head_title: { // 上方标题
    //     visible: true,
    //     style: {
    //       fontWeight: '500',
    //       font: 'c2',
    //       fontSize: '18px',
    //       textAlign: 'center',
    //     },
    //   },
    //   main_title: { // 主标题
    //     visible: true,
    //     style: {
    //       fontSize: '18px',
    //       fontWeight: '600',
    //       font: 'c3',
    //       textAlign: 'center',
    //     },
    //   },
    //   sub_title: { // 副标题
    //     visible: true,
    //     style: {
    //       fontSize: '12px',
    //       fontWeight: '300',
    //       font: '#878e99', // 该配色不属于当前配色规范
    //       textAlign: 'center',
    //     },
    //   },
    //   main_svg: {
    //     visible: true,
    //     style: {
    //       bg: 'c1',
    //     },
    //   },
    // },
    // {
    //   control_id: 'C017',
    //   can_hidden: true,
    //   visible: true,
    //   img: {
    //     visible: true,
    //     style: {
    //       url: '',
    //     },
    //   },
    //   content: {
    //     visible: true,
    //     style: {
    //       fontSize: '20px',
    //       fontWeight: '600',
    //       font: 'c2',
    //       textAlign: 'center',
    //     },
    //   },
    // },
    // {
    //   control_id: 'C018',
    //   can_hidden: true,
    //   visible: true,
    //   img: {
    //     visible: true,
    //     style: {},
    //   },
    // },
    // {
    //   control_id: 'C019',
    //   can_hidden: true,
    //   visible: true,
    //   content: {
    //     visible: true,
    //     style: {
    //       fontSize: '16px',
    //       fontWeight: '400',
    //       font: 'c2',
    //       textAlign: 'left',
    //     },
    //   },
    // },
  ],
};
const course_content_data_question_module_tmp = {
  id: '',
  head_title: {
    stage: 0, // 阶段索引
    section_name: '章节模块', // 章节名称
  },
  list: {
    data: [ // 默认为 []
      // {
      //   title: {
      //     title: '', // 试题标题
      //     type: 0, // 0: 单选，1： 多选
      //   },
      //   options: {
      //     options: [{ // 选项，同题库
      //       id: '',
      //       desc: '',
      //     }]
      //   }
      // }
    ],
  },
  relevance_question: {
    question: {
      total: 5,
      diffculty: 1,
      medium: 1,
      easy: 3,
      selected_question: [ // 默认 []
        // {
        //   id: "", // 试题id
        //   level: 0, // 试题等级 难中易
        // },
      ],
    },
    star: {
      total: 3, // 星星总数，每个章节 3 颗星
      rules: [{ // 获得星星规则
        answer: 5, // 答对题数
        star_num: 3, // 获得星星数
      }],
    },
  },
};
const course_content_tmp = {
  data: {
    course_module: [
      _.cloneDeep(course_module_tmp.data), _.cloneDeep(course_module_tmp.data),
    ], // 每个 data 中都有一个课程的 id
    question_module: [_.cloneDeep(course_content_data_question_module_tmp)],
  },
  config: {
    course_module: [_.cloneDeep(course_module_tmp.config), _.cloneDeep(course_module_tmp.config)],
    question_module: [{
      head_title: {
        control_id: 'C10',
      },
      list: {
        control_id: 'Z001',
        data: [],
      },
    }],
  },
};
const chapter_tmp = {
  data: {
    name: '章节模块', // 章节名称
    star: 0, // 已获得的星星数
    all_star: 3, // 应获得的星星数
    course_module: [{
      id: '', // 课程模块 id
      name: '课程模块', // 课程模块名称
    }, {
      id: '',
      name: '课程模块',
    }],
    question_module: [{
      id: '', // 试题模块 id
      name: '考试环节', // 试题模块名称
      has_question: 0, // 是否已经添加试题 0: 否 1: 是
    }],
  },
  config: {
    control_id: 'C8',
    all_star_icon: {
      type: 'xingji',
      can_hidden: true,
      visible: true,
      style: {
        font: 'c4',
        size: 12,
      },
    },
    star_icon: {
      can_hidden: true,
      visible: true,
      type: 'xingji',
      style: {
        font: 'c2',
        size: 12,
      },
    },
  },
};
const config_tmp = {
  text_config: [{
    type: 'h1',
    font: 'c2',
    size: '20px',
    weight: 'medium',
  }, {
    type: 'h2',
    font: 'c2',
    size: '18px',
    weight: 'medium',
  }, {
    type: 'h3',
    font: 'c3',
    size: '12px',
    weight: 'regular',
  }, {
    type: 'h4',
    font: 'c3',
    size: '24px',
    weight: 'medium',
  }, {
    type: 'text',
    font: 'c2',
    size: '16px',
    weight: 'regular',
  }],
  chapter_list: {
    header: {
      control_id: 'C6',
      can_hidden: true,
      visible: true,
      img: { // 封面图
        can_hidden: true,
        visible: true,
        style: {},
      },
      mongol_img: { // 蒙层图
        can_hidden: true,
        visible: true,
        style: {
          background: 'transparent',
        },
      },
    },
    overview: {
      control_id: 'C7',
    },
    list: [_.cloneDeep(chapter_tmp.config), _.cloneDeep(chapter_tmp.config)],
  },
  course_content: [_.cloneDeep(course_content_tmp.config), _.cloneDeep(course_content_tmp.config)],
};
const current = {
  data: {
    chapter_list: { // 章节目录
      header: {
        img: '', // 封面图
        mongol_img: '', // 蒙层图
      },
      overview: {
        name: '', // 阶段名称
        chapter_num: 0, // 阶段章节数
        section_num: 0, // 小节数
        completed_num: 0, // 已完成章节数
        chapter_total: 0, // 课程章节总数
        star: 0, // 已获得星级数
        all_star: 6, // 全部星级数
      },
      list: [_.cloneDeep(chapter_tmp.data), _.cloneDeep(chapter_tmp.data)],
    },
    course_content: [_.cloneDeep(course_content_tmp.data), _.cloneDeep(course_content_tmp.data)],
  },
  config: [_.cloneDeep(config_tmp)],
};
const template = {
  id: '', // 模版 id
  name: '', // 模版名称
  config: {
    color: [ // 配色方案
      ['#D20B12', '#2F2F2F', '#888C8F', '#D4D4D4', '#F4F4F4', '#FAFAFA', '#FFFFFF'],
    ],
    font: [12, 13, 14, 16, 18, 20, 24, 28],
    custom_font: [12, 13, 14, 16, 18, 20, 24, 28],
    controls: {
      color: [],
      certificate: [],
      badge: ['C020'],
      course_list: ['C001', 'C002'],
      stage_list: ['C003', 'C004', 'C005'],
      chapter_list: ['C006', 'C007', 'C008'],
      question_module: ['C010', 'C011', 'C013', 'C012'],
      course_module: ['C009', 'C015', 'C016', 'C018', 'C019', 'C017', 'C014'],
    },
    controlId: {
      C1: 'C001',
      C2: 'C002',
      C3: 'C003',
      C4: 'C004',
      C5: 'C005',
      C6: 'C006',
      C7: 'C007',
      C8: 'C008',
      C9: 'C009',
      C10: 'C010',
      C11: 'C011',
      C12: 'C012',
      C13: 'C013',
      C14: 'C014',
      C15: 'C015',
      C16: 'C016',
      C17: 'C017',
      C18: 'C018',
      C19: 'C019',
      C20: 'C020',
      C21: 'C021',
    },
  },
  selected: 0,
};
const nav_chapter_child = {
  type: 'chapter',
  name: '章节模块',
  style: 2,
  addable: true,
  addTxt: '添加课程',
  custom: true,
  default_childs: [{
    type: 'question_module',
    name: '试题模块',
    style: 3,
  }],
  childs: [
    {
      type: 'course_module',
      name: '课程模块',
      style: 3,
      custom: true,
    },
    {
      type: 'course_module',
      name: '课程模块',
      style: 3,
      custom: true,
    },
  ],
};
const nav_struct = [{
  type: 'global',
  name: '课程全局设置',
  addable: false,
  style: 0,
  childs: [{
    type: 'badge',
    name: '徽章规则',
    style: 1,
    can_hidden: false,
  }, {
    type: 'certificate',
    name: '证书规则',
    style: 1,
  }, {
    type: 'course_list',
    name: '课程列表',
    style: 1,
  }, {
    type: 'stage_list',
    name: '课程阶段列表',
    style: 1,
  }],
}, {
  type: 'content',
  name: '课程内容设置',
  style: 0,
  childs: [{
    type: 'color',
    name: '课程配色',
    style: 1,
  }, {
    type: 'chapter_list',
    name: '章节目录',
    style: 1,
  }, {
    addable: true,
    addTxt: '添加章节',
    childs: [nav_chapter_child, nav_chapter_child],
  }],
}];
const level = {
  current,
  template: [{
    ...template,
    id: 1,
    name: '标准课程模版',
    selected: 1,
  // }, {
  //   ...template,
  //   id: 2,
  //   name: '标准课程模版2',
  }],
  nav_struct,
};

module.exports = () => (_.cloneDeep({ level, course_content_data_question_module_tmp }));
