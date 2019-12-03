const router = require('express').Router()
const UserRouter = require('./user')
const ArticleRouter = require('./article')

router.use('/user', UserRouter)
router.use('/article', ArticleRouter)

module.exports = router