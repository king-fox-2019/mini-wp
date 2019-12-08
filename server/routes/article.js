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
routes.get('/myarticles', articleController.myArticle)
routes.post('/', upload.array('image') ,articleController.create)
routes.post('/tag', articleController.findbytag)
routes.patch('/:id', authorization , articleController.updatePatch)
routes.put('/:id/oldpicture', authorization ,articleController.updatePut)
routes.put('/:id', authorization ,upload.array('image') ,articleController.updatePut)
routes.delete('/:id', authorization ,articleController.deleted)

module.exports = routes