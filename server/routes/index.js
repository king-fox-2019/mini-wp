'use strict'

const express = require('express')
const router = express.Router()
const article = require('./articleRouter')
const user = require('./userRouter')

router.use('/articles', article)
router.use('/users', user)

module.exports = router