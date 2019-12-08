const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
// router.get('/oauth/redirect', UserController.githubLogin)

module.exports = router