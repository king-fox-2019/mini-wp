const express =require('express')
const router = express.Router()
const authorCtrl = require('../controllers/authorCtrl')

router.post('/register', authorCtrl.register)
router.post('/login', authorCtrl.login)
router.post('/google', authorCtrl.googleLogin)

module.exports = router