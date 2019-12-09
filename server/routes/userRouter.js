'use strict'

const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const googleVerify = require('../middlewares/googleVerify')

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/login/google', googleVerify, user.googleSignIn)
router.get('/cekSession', authentication, user.cekSession)
router.get('/articles', authentication, user.read)

module.exports = router