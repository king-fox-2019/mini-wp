'use strict'
const express = require('express')
const route = express.Router()
const user = require('./user')
const article = require('./article')

route.use('/users',user)
route.use('/articles',article)


module.exports = route