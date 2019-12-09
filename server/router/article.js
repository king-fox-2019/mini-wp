const routes = require('express').Router()
const ArticleController = require('../controllers/article')
const { upload } = require('../middlewares/fileUpload')
const { authenticate, authorize } = require('../middlewares/auth')

routes.use(authenticate)
routes.post('/', upload.single('file'), ArticleController.addArticle)
routes.put('/image/:id', upload.single('file'), authorize, ArticleController.updateArticle)
routes.put('/:id', authorize, ArticleController.updateArticle)
routes.patch('/tag/:id', authorize, ArticleController.addTag)
routes.get('/',ArticleController.allArticle)
routes.get('/author',ArticleController.userArticle)
routes.get('/:id',ArticleController.detailArticle)
routes.get('/tag/:tag',ArticleController.tagArticle)
routes.delete('/:id',authorize,ArticleController.delete)


module.exports = routes