const routes = require('express').Router()
const gcsUpload = require('gcs-upload')
const userController = require('../controllers/user')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "miniwp-king-imagebucket"
    }
})

routes.get('/', userController.findAll)
routes.post('/login', userController.login)
routes.post('/register', upload.single('imageUrl'), userController.register)
routes.delete('/:id', userController.deleted)

module.exports = routes