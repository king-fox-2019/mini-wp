const router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')
const ArticleController = require('../controllers/article')
const AuthorizationArticle = require('../middlewares/authorization').article

// create article
router.post('/', Authenticate, ArticleController.createArticle)

// get one article
router.get('/:id', Authenticate, ArticleController.getOneArticle)

// get all article
router.get('/', Authenticate, ArticleController.getAllArticle)

// give likes
router.patch('/likes/:id', Authenticate, ArticleController.likeArticle)

// edit article
router.put('/:id', Authenticate, AuthorizationArticle, ArticleController.editArticle)

// delete article
router.delete('/:id', Authenticate, AuthorizationArticle, ArticleController.deleteArticle)

module.exports = router