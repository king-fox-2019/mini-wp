const express = require('express')
const router = express.Router()
const articleController = require('../controller/articleController')

router.get('/',articleController.getArticles)
router.post('/',articleController.createArticle)
router.delete('/',articleController.deleteArticle)
router.put('/',articleController.updateArticle)

module.exports = router