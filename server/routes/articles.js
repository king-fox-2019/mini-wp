const articles = require('express').Router()
const { ArticleController } = require('../controllers')
const { authorize } = require('../middlewares/auth')

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getAllArticles)
articles.get('/:id', ArticleController.getOneArticle)

articles.use('/:id', authorize)
articles.put('/:id', ArticleController.editArticle)
articles.delete('/:id', ArticleController.deleteArticle)

module.exports = articles
