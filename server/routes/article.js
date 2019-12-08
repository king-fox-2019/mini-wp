const router = require('express').Router();
const ArticleController = require('../controllers/article');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const gcsUpload = require('../middlewares/gcsUpload');

router.use(authenticate)
router.get('/', ArticleController.showAll);
router.get('/:id', ArticleController.showOne);
router.post('/', ArticleController.create);
router.post('/uploader', gcsUpload.single('image'), ArticleController.uploadFile);
router.put('/:id', authorize, ArticleController.update);
router.patch('/:id/trash', authorize, ArticleController.trashStatus);
router.delete('/:id', authorize, ArticleController.destroy);

module.exports = router;