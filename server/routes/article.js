const router = require('express').Router()
const articleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const gcsUpload = require('../middlewares/upload')

router.get('/', articleController.findAll)

router.use(authentication)
router.post('/', gcsUpload.single('image'), articleController.create)
router.get('/', articleController.findMyArticle)

router.use('/:id', authorization)
router.get('/:id', articleController.findOne)
router.delete('/:id', articleController.delete)
router.patch('/:id/gcs', gcsUpload.single('image'), articleController.update)
router.patch('/:id', articleController.update)


module.exports = router
