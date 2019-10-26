const Router = require('koa-router');
const router = new Router();
const controller = require('../controller/comment')

router.get('/comment', controller.getComment)

router.post('/comment', controller.addComment)

router.delete('/comment', controller.deleteComment)

module.exports = router