const router = require('express').Router()
const articleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const gcsUpload = require('../middlewares/upload')

router.get('/mine', authentication, articleController.findAll)
router.get('/', articleController.findAll)
router.get('/:id', articleController.findOne)

router.use(authentication)
router.post('/', gcsUpload.single('image'), articleController.create)

router.use('/:id', authorization)
router.delete('/:id', articleController.delete)
router.patch('/:id/gcs', gcsUpload.single('image'), articleController.update)
router.patch('/:id', articleController.update)


module.exports = router
