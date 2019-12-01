const articles = require('express').Router()
const { ArticleController } = require('../controllers')

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getAllArticles)
articles.get('/:id', ArticleController.getOneArticle)

module.exports = articles
