const router = require('express').Router()
const { authentication, authorization } = require('../middlewares/auth')
const userRouter = require('./user')
const articleRouter = require('./article')

router.use('/users', userRouter)
router.use('/articles', articleRouter)

module.exports = router