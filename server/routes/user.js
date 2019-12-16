'use strict'
const express = require('express')
const user = express.Router()
const UserCon = require('../controllers/UserCon')
const loginGoogle = require('../middlewares/googleLogin')

user.post('/login',UserCon.login)
user.post('/register',UserCon.register)
user.post('/loginGoogle', loginGoogle, UserCon.loginGoogle)

module.exports = user
