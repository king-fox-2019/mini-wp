const user = require('express').Router()
const { UserController, ArticleController } = require('../controllers')

user.get('/checksession', UserController.checkSession)
user.get('/articles', ArticleController.getAllUserArticles)
user.patch('/name', UserController.updateUserFullName)

module.exports = user
