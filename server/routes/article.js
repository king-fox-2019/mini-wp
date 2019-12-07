const router = require('express').Router(),
    ArticleController = require('../controllers/article'),
    { authenticate, authorize } = require('../middlewares/auth')

router.get('/', ArticleController.all)
router.use(authenticate)
router.post('/create', ArticleController.create)
router.delete('/:id', authorize, ArticleController.delete)
router.patch('/:id', authorize, ArticleController.patch)


module.exports = router