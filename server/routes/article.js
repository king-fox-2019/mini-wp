const router = require('express').Router()
const ArticleController = require('../controllers/ArticleController')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/gcsUpload')

router.use(authentication)
router.post('/', upload.array('imgUrl'), ArticleController.create)
router.get('/', ArticleController.readAll)
router.get('/personal', ArticleController.readUserArticle)

router.use('/:id', authorization)
router.get('/:id', ArticleController.readOne)
router.put('/:id', upload.array('imgUrl'), ArticleController.updateField)
router.delete('/:id', ArticleController.deleteArticle)

module.exports = router