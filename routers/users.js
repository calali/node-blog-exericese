const Router = require('koa-router');
const router = new Router();
const controller = require('../controller/users')
router.post('/login', controller.login)

router.post('/logout', controller.logout)

router.post('/signup', controller.addUser)

router.put('/user', controller.editUser)

module.exports = router