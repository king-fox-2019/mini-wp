const router = require('express').Router()
const UserController = require('../controllers/user')
const Authenticate = require('../middlewares/authenticate')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.get('/', Authenticate, UserController.getAllUser)

router.get('/:id', Authenticate, UserController.getOneUser)

module.exports = router