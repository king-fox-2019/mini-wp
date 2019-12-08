const router = require('express').Router()
const gcsUpload = require('gcs-upload')
const TodoController = require('../controllers/TodoController')
const { authenticate, authorize } = require('../middlewares/auth')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './Mini WP-593a182568c1.json',
    bucketName: 'mini-wp-image-37'
  }
})
router.use(authenticate)
router.get('/', TodoController.showAll)
router.post('/', upload.single('file'), TodoController.create)

router.use('/:id', authorize)
router.get('/:id', TodoController.showOne)
router.patch('/:id', TodoController.edit)
router.delete('/:id', TodoController.remove)


module.exports = router