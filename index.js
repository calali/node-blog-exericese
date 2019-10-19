const Koa = require('koa');
const app = new Koa();

const routes = require('./routers/index')
app.use(routes.routes());


app.listen(3001);