const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/articleCtrl')


router.get('/', articleCtrl.getArticle)
// router.get('/:author', articleCtrl.getArticleByAuthor)
router.get('/:id', articleCtrl.getOneArticle)
router.post('/', articleCtrl.createArticle)
router.delete('/:id', articleCtrl.deleteArticle)
// router.put('/:id', articleCtrl.editArticle)

module.exports = router