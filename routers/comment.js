const Router = require('koa-router');
const router = new Router();


router.get('/comment', (ctx, next) => {
    ctx.body = 'post';
})

router.post('/comment', (ctx, next) => {
    ctx.body = 'post';
})

router.delete('/comment', (ctx, next) => {
    ctx.body = 'post';
})

router.put('/comment', (ctx, next) => {
    ctx.body = 'register';
})

module.exports = router


// 查询：get
// 增加：post
// 改动：put
// 删除：delete