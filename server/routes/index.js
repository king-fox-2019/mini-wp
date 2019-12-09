'use strict'

const express = require('express')
const router = express.Router()
const article = require('./articleRouter')
const user = require('./userRouter')

router.use('/users', user)
router.use('/articles', article)

module.exports = router