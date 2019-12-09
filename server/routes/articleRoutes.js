const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController.js');
const authentication = require('../middleware/authentication.js');
const authorization = require('../middleware/authorization.js');
const { sendUploadToGCS, multer } = require('../helpers/images.js');
const translateToIna = require('../middleware/translate');

router.use(authentication)
router.get('/', ArticleController.getAll)
router.get('/user', ArticleController.getAllUserArticle)
router.get('/:id', ArticleController.getArticleByTag)
router.post('/', multer.single('image'), sendUploadToGCS, translateToIna, ArticleController.create)
router.delete('/:id', authorization, ArticleController.delete)
router.patch('/:id', authorization, multer.single('image'), sendUploadToGCS, ArticleController.update)

module.exports = router


