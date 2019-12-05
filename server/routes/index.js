const express = require('express')
const router = express.Router()
const article = require('../routes/articleRoute')
const user = require('../routes/userRoute')
const {authentication} = require('../middlewares/auths')

router.use('/user',user)
router.use(authentication)
router.use('/article',article)

module.exports = router