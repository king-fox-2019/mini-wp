const router = require('express').Router()
const upload = require('../middlewares/uploadImage')

router.post('/upload', upload.single('file'), (req,res)=>{
    res.json(req.body)
})

module.exports = router