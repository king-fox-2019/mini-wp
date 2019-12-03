const express = require('express')
const router = express.Router()
const articleCtrl = require('../controllers/articleCtrl')


router.get('/', articleCtrl.getArticle)
router.get('/:id', articleCtrl.getOneArticle)
router.post('/', articleCtrl.createArticle)
router.delete('/:id', articleCtrl.deleteArticle)
router.patch('/:id', articleCtrl.deleteArticle)

module.exports = router