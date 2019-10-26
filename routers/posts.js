const Router = require('koa-router');
const router = new Router();
const controller = require('../controller/posts')

router.get('/posts', controller.getPosts)

router.post('/posts', controller.addPost)

router.delete('/posts', controller.deletePost)

router.put('/posts', controller.editPost)

module.exports = router