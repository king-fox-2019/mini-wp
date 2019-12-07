'use strict'

const express = require('express')
const router = express.Router()
const article = require('./articleRoute')
const user = require('./userRoute')

router.use('/articles', article)
router.use('/users', user)

module.exports = router