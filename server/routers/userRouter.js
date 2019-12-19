const router = require('express').Router()
const UserController = require('../controllers/User')
const {authentication} = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)
router.get('/', authentication, UserController.getUser)

module.exports = router