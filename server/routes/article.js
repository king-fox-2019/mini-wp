const router = require('express').Router()
const Authenticate = require('../middlewares/authenticate')
const ArticleController = require('../controllers/article')
const AuthorizationArticle = require('../middlewares/authorization').article

// create article
router.post('/', Authenticate, ArticleController.createArticle)

// get all publish article
router.get('/publish', ArticleController.getAllArticlePublish)

// get all draft article
router.get('/draft', Authenticate, ArticleController.getAllArticleDraft)

// get one article
router.get('/:id', Authenticate, ArticleController.getOneArticle)

// give likes
router.patch('/likes/:id', Authenticate, ArticleController.likeArticle)

// edit article
router.put('/:id', Authenticate, AuthorizationArticle, ArticleController.editArticle)

// delete article
router.delete('/:id', Authenticate, AuthorizationArticle, ArticleController.deleteArticle)

module.exports = router