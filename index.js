const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');

app.use(koaBody());
app.use(require('./routers/users').routes());
app.use(require('./routers/posts').routes());
app.use(require('./routers/comment').routes());

app.listen(3001);