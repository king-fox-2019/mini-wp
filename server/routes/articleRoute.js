const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/articleCtrl')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', articleCtrl.getArticle)
router.get('/:authorID', articleCtrl.getArticleByAuthor)
router.get('/:id', articleCtrl.getOneArticle)

router.use(authentication)
router.post('/', articleCtrl.createArticle)
router.delete('/:id', authorization, articleCtrl.deleteArticle)
router.put('/:id', authorization, articleCtrl.editArticle)

module.exports = router