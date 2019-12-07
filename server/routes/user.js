const router = require('express').Router()
const UserController = require('../controllers/user')
const Authenticate = require('../middlewares/authenticate')

// register
router.post('/register', UserController.registerUser)

// login
router.post('/login', UserController.loginUser)

// get all user
router.get('/', Authenticate, UserController.getAllUser)

// get one user
router.get('/profile', Authenticate, UserController.getOneUser)

module.exports = router