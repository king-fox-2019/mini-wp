const express = require('express')
const router = express.Router()
const article = require('../routes/articleRoute')

router.use('/article',article)

module.exports = router