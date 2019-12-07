const router = require('express').Router()
const projectController = require('../controllers/projectController')
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



router.get('/all',projectController.showAll)

router.use(authetication)

router.get('/',projectController.findByUserId)
router.get('/:id',projectController.findOne)
router.post('/', upload.array('files'),projectController.createProject)
router.delete('/:id',projectController.deleteProject)
router.put('/:id',projectController.updateProject)

module.exports = router