const Router = require('koa-router');
const router = new Router();


router.get('/posts', (ctx, next) => {
    ctx.body = 'post';
})

router.post('/posts', (ctx, next) => {
    ctx.body = 'post';
})

router.delete('/posts', (ctx, next) => {
    ctx.body = 'post';
})

router.put('/posts', (ctx, next) => {
    ctx.body = 'register';
})

module.exports = router