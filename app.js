const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const cors = require('@koa/cors');
const views = require('koa-views');

const connectMongo = require('./mongodb/connect');
const router = require('./routes');

connectMongo();
const app = new Koa();

// Must be used before any router is used
app.use(views(`${__dirname}/views`, {
  map: {
    html: 'ejs',
  },
}));
app
  .use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '16mb',
    textLimit: '5mb',
  }))
  .use(compress())
  .use(cors({
    origin: '*',
  }))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);
