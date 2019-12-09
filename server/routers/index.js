const router = require('express').Router()
const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')
const {authentication} = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')
const {singleUpload} = require('../services/fileUpload')
// const singleUpload = fileUpload.single('image')

router.use('/user', userRouter)

router.post('/imgUpload', function(req, res) {
   singleUpload(req, res, function(err) {
      if(err) {
         console.error(err)
         res.status(500).json({message: err.message})
      }
      else res.status(201).json({image: req.file.location})
   })
})

router.use(authentication)
router.use('/article', articleRouter)
router.use(errorHandler)

module.exports = router