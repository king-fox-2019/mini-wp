const router = require('express').Router()
const UserRouter = require('./user')
const ArticleRouter = require('./article')
const CommentRouter = require('./comment')

router.use('/user', UserRouter)
router.use('/article', ArticleRouter)
router.use('/comment', CommentRouter)

module.exports = router