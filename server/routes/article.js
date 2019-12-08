const router = require('express').Router()
const ArticleController = require('../controllers/articleController')
const gcsUpload = require('gcs-upload')
const { authentication, authorization} = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './keyfile.json',
      bucketName: process.env.BUCKET_NAME
    }
  })

router.get('/', ArticleController.showAll)
router.get('/tag/:tag', ArticleController.showByTag)
router.use(authentication)
router.post('/', upload.single('file'), ArticleController.create)
router.get('/user', ArticleController.showUserArticle)
router.get('/:articleId', ArticleController.showOne)
router.put('/:articleId', authorization, upload.single('file'), ArticleController.update)
router.delete('/:articleId', authorization, ArticleController.delete)

module.exports = router