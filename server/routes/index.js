const express = require('express')
const router = express.Router()
const articleRoute = require('./articleRoute')

router.use('/articles', articleRoute)

module.exports = router