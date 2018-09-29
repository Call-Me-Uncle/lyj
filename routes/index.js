const Router = require('koa-router');
const lvRouter = require('./lvRouter.js');

const router = new Router();
router.use('/lvyouju', lvRouter.routes(), lvRouter.allowedMethods());
router.get('/', async (ctx) => {
  await ctx.render('index');
});
module.exports = router;
