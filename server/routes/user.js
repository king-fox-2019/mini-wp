const router = require('express').Router()
const { authentication, authorization } = require('../middlewares/auth')
const UserController = require('../controllers/userController')

router.post('/signup', UserController.create)
router.post('/signin', UserController.signin)
router.post('/signin/google', UserController.google)
router.use(authentication)
router.put('/', UserController.update)
router.delete('/', UserController.delete)

module.exports = router