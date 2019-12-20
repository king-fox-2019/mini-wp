const router = require('express').Router()
const ControllerArticle = require('../controllers/article')
const authenticate = require('../middlewares/authenticate')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './google-credential.json',
    bucketName: 'readiant-images'
  }
})

router.post('/upload-image', authenticate, upload.single('file'), (req, res, next) => {
  const link = req.body.file

  res.status(200).json({
    message: 'Image uploaded!', link
  })
})

router.get('/', ControllerArticle.fetchAll)

router.post('/', authenticate, ControllerArticle.add)

router.get('/:id', ControllerArticle.fetchOne)

router.put('/:id', ControllerArticle.update)

router.delete('/:id', ControllerArticle.delete)

router.post('/:id/comments', authenticate, ControllerArticle.addComment)

module.exports = router