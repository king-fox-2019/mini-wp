const router = require('express').Router()
const ArticleController = require('../controllers/Article')
const {authorization} = require('../middlewares/auth')

router.post('/', ArticleController.create)
router.get('/', ArticleController.readAll)
router.get('/:id', authorization, ArticleController.readOne)
router.patch('/:id', authorization, ArticleController.update)
router.delete('/:id', authorization, ArticleController.delete)

module.exports = router