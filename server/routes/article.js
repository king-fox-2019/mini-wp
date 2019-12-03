const routes = require('express').Router()
const gcsUpload = require('gcs-upload')
const articleController = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "miniwp-king-imagebucket"
    }
})

routes.use(authentication)
routes.get('/', articleController.findAll)
routes.post('/', upload.single('imageUrl') ,articleController.create)
routes.patch('/', authorization ,marticleController.updatePatch)
routes.put('/:id', authorization ,upload.single('imageUrl') ,articleController.updatePut)
routes.delete('/:id', authorization ,articleController.deleted)

module.exports = routes