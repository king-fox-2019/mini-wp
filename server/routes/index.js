const router = require('express').Router(),
    userRoute = require('./user'),
    articleRoute = require('./article')

router.use('/user', userRoute)
router.use('/article', articleRoute)

module.exports = router