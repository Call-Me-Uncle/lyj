const Router = require('koa-router');
const lvRouter = require('./lvRouter.js');

const router = new Router();
router.use('/lvyouju', lvRouter.routes(), lvRouter.allowedMethods());
router.post('/wx', async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
});
router.get('/', async (ctx) => {
  await ctx.render('index');
});
module.exports = router;


