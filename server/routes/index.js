const express = require('express')
const router = express.Router()
const articleRoute = require('./articleRoute')
const authorRoute = require('./authorRoute')

router.use('/articles', articleRoute)
router.use('/author', authorRoute)

module.exports = router