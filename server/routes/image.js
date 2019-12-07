const router = require('express').Router()
const upload = require('../middlewares/uploadImage')

router.post('/upload', upload.single('file'), (req,res)=>{
    let linkImage = req.body.file
    res.json(linkImage)
})

module.exports = router