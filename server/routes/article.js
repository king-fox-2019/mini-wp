const router = require('express').Router()
const articleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: 'femme-featured-images'
  }
})

router.use(authentication)
router.get('/', articleController.findAll)
router.post('/', upload.single('file'), articleController.create)

router.use('/:id', authorization)
router.get('/:id', articleController.findOne)
router.delete('/:id', articleController.delete)
router.patch('/:id', articleController.update)

module.exports = router

