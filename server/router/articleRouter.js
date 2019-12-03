const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')



router.get('/test', ArticleController.test )

// kirim idnya nanti pake req.decoded, bukan pake params
router.post('/', ArticleController.createArticle)
router.get('/', ArticleController.getOneArticle)
router.get('/all', ArticleController.getAllArticle)


router.put('/', ArticleController.putArticle)
router.patch('/', ArticleController.patchArticle)
router.delete('/', ArticleController.deleteArticle)

module.exports = router