const user = require('express').Router()
const { UserController, ArticleController } = require('../controllers')

user.get('/checksession', UserController.checkSession)
user.get('/articles', ArticleController.getAllUserArticles)

module.exports = user
