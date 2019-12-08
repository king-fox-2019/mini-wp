const router = require('express').Router()
const article = require('./articleRoute')
const user = require('./userRoute')

router.use('/article',article)
router.use('/user',user)

module.exports = router