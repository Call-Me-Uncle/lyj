const router = require('koa-router')();
const { mergeRes } = require('../controller/commonFn/res.js');
const dealApi = require('../controller/lvyouju/index.js');

router.post('/', async (ctx) => {
  const { query: { type } } = ctx.request;
  let res;
  if (dealApi[type]) {
    try {
      // 将处理结果和基础返回数据进行合并，然后返回给客户端
      res = await dealApi[type](ctx.request.body, ctx);
    } catch (e) {
      console.log(e);
      res = {
        error_id: 'node_001',
        error_str: e.toString(),
      };
    }
  }
  ctx.body = mergeRes(res);
});
module.exports = router;
