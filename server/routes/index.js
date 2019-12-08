const router = require('express').Router()
const ArticleController = require('../controllers/articleC')
const UserController = require('../controllers/userC')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/gcs')


// router user
// console.log("tes masuk ga");
router.get('/list-user', UserController.list)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/google-signin', UserController.googleOAuth)

// router article

router.get('/article', ArticleController.showAll)

router.get('/article/:id', ArticleController.showOne)

router.use(auth)

router.post('/article', upload.single('featured_image'), ArticleController.createArticle)

router.delete('/article/:id', ArticleController.delete)

router.put('/article/:id', ArticleController.update)

module.exports = router