'use strict'

const express = require('express')
const router = express.Router()
const article = require('./articleRouter')
const user = require('./userRouter')
const authentication = require('../middlewares/authentication')

router.use('/users', user)
router.use(authentication)
router.use('/articles', article)

module.exports = router