const router = require('express').Router()
const gcsUpload = require('gcs-upload')
const ArticleController = require('../controller/ArticleController')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

const upload = gcsUpload({  
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './miniWP-a0f1076d8754.json',
      bucketName: 'bucket-jap'
    }
  })



router.get('/test', ArticleController.test)


router.use(authentication)
router.get('/all', ArticleController.findAll)
router.post('/create', upload.single('file'), ArticleController.create)
router.get('/filter', ArticleController.filter)

router.use(authorization)
router.put('/update', ArticleController.putUpdate)
router.patch('/update', ArticleController.patchUpdate)
router.delete('/delete', ArticleController.delete)


module.exports = router