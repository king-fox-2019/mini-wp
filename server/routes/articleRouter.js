'use strict'

const express = require('express')
const router = express.Router()
const article = require('../controllers/articleController')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/gcsUpload')
const authentication = require('../middlewares/authentication')

router.post('/image', upload.single('image'), (req, res) => {
  res.status(200).json(req.body)
})

router.use(authentication)
router.post('/', article.create)
router.get('/', article.read)
router.put('/:id', authorization, article.update)
router.delete('/:id', authorization, article.delete)
// router.put('/:id', article.update)
// router.delete('/:id', article.delete)

module.exports = router