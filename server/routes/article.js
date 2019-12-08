const router = require('express').Router(),
    ArticleController = require('../controllers/article'),
    { authenticate } = require('../middlewares/auth')

router.get('/', ArticleController.all)
router.use(authenticate)
router.post('/', ArticleController.create)

module.exports = router