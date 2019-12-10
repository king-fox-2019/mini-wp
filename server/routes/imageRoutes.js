const express = require('express');
const router = express.Router();
const images = require('../helpers/images');
const { deleteFile } = require('../helpers/images');

router.get('/', (req, res, next) => {
    res.send({ message: 'image router invoked' })
})

router.post('/upload', images.multer.single('image'), images.sendUploadToGCS, (req, res) => {
    res.send({
        status: 200,
        message: 'Image successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

router.delete('/',deleteFile)

module.exports = router