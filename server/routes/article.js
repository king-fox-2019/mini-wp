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
routes.get('/tag', articleController.findbytag)
routes.post('/', upload.array('imageUrl') ,articleController.create)
routes.patch('/:id', authorization , articleController.updatePatch)
routes.put('/:id', authorization ,upload.array('imageUrl') ,articleController.updatePut)
routes.delete('/:id', authorization ,articleController.deleted)

module.exports = routes