const router = require('express').Router(),
    userRouter = require('./user'),
    articleRouter = require('./article')

router.use('/user', userRouter)
router.use('/article', articleRouter)

module.exports = router