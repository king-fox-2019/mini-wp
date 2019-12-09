const router = require('express').Router()

const { ArticleController } = require('../controllers')
const { authenticate, authorize } = require('../middlewares')


router.use(authenticate)
router.get('/', ArticleController.getAllArticles)
router.post('/', ArticleController.createNewArticle)

router.use(authorize)
router.delete('/', ArticleController.deleteArticle)
router.put('/', ArticleController.updateArticle)
router.patch('/', ArticleController.updateArticle)


module.exports = router
