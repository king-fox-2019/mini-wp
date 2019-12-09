const router = require('express').Router();
const ArticleRouter = require('../routes/article');
const UserController = require('../controllers/user');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/gsign', UserController.googleSign);

router.use('/articles', ArticleRouter);

module.exports = router;