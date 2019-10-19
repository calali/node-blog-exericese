const Router = require('koa-router');
const router = new Router();

router.post('/users', (ctx, next) => {
    ctx.body = 'Hello World!';
})

module.exports = router