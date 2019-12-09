const router = require('express').Router()
const articleController = require('../controllers/articleController')
const authetication = require('../middlewares/authentication')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({  
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './credentials-gcs.json',
      bucketName: 'bucket-alfred'
    }
  })

  // function showData(req,res,next){
  //   console.log(req.body)
  // }

router.get('/all',articleController.showAll)
router.use(authetication)

router.get('/',articleController.findByUserId)
router.get('/:id',articleController.findOne)
router.post('/:id/likes',articleController.addLikes)
router.post('/',upload.array('files'),articleController.createArticle)
router.delete('/:id',articleController.deleteArticle)
router.put('/:id',upload.array('files'),articleController.updateArticle)

module.exports = router