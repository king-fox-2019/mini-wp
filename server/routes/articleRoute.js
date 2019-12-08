const router = require('express').Router()
const articleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/auths')
const { upload } = require('../middlewares/upload')

router.get('/',articleController.getArticles)
router.get('/user',authentication,articleController.getUserArticles)
router.post('/',authentication,upload.single('featured_image'),articleController.createArticle)
router.delete('/',authentication,articleController.deleteArticle)
router.put('/',authentication,upload.single('featured_image'),articleController.updateArticle)

module.exports = router