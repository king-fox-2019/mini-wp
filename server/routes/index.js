const router = require('express').Router()
const UserRouter = require('./user')
const ArticleRouter = require('./article')
const CommentRouter = require('./comment')
const ImageRouter = require('./image')

router.use('/user', UserRouter)
router.use('/article', ArticleRouter)
router.use('/comment', CommentRouter)
router.use('/image', ImageRouter)

module.exports = router