const Router = require('koa-router');
const lvRouter = require('./lvRouter.js');

const router = new Router();
router.use('/lvyouju', lvRouter.routes(), lvRouter.allowedMethods());
router.post('/wx', async (ctx) => {
  console.log(11111);
  ctx.body = {}
});
router.get('/', async (ctx) => {
  await ctx.render('index');
});
module.exports = router;
