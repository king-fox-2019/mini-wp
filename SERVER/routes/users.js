const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.post('/google-sign-in', ControllerUser.googleSignIn)

router.get('/user', authenticate, ControllerUser.fetchOne)

module.exports = router