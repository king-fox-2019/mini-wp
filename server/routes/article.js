const routes = require('express').Router()
const ArticleController = require('../controllers/article')

routes.get('/', ArticleController.show)
routes.post('/', ArticleController.create)
routes.put('/',ArticleController.update)
routes.delete('/', ArticleController.delete)

module.exports = routes