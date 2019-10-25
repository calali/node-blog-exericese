const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const config = require('./config/index')
const session = require('koa-session');

app.use(koaBody());

app.use(require('./routers/users').routes());
app.use(require('./routers/posts').routes());
app.use(require('./routers/comment').routes());

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 24 * 60 * 60 * 1000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: false, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
app.use(session(CONFIG, app));

app.listen(config.port,()=>{
    console.log(`listening at port ${config.port}`)
});


 
