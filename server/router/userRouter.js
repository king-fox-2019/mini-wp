const router = require('express').Router()
const UserController = require('../controller/UserController')
const gVerify = require('../middleware/googleVerify')

router.get('/test', UserController.test)
router.get('/all', UserController.findAll)

router.post('/register', UserController.register)
router.post('/gsignin', gVerify, UserController.googleSignIn)
router.post('/login', UserController.login)


module.exports = router