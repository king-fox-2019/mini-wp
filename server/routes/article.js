const router = require('express').Router()
const ArticleC = require('../controllers/article')
const { authentication, authorization } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require('../middlewares/uploader')


router.get('/posted', ArticleC.findAllPosted)
router.get('/draft', authentication, ArticleC.findAllDraft)
router.get('/tags', ArticleC.tag)
router.get('/slug/:slug', ArticleC.findBySlug)
router.get('/:id', ArticleC.findOne)
router.post('/add', authentication, multer.single('image'), sendUploadToGCS, ArticleC.add)
router.post('/addDraft', authentication, multer.single('image'), sendUploadToGCS, ArticleC.addDraft)
router.delete('/remove/:id', authentication, authorization, ArticleC.remove)
router.patch('/addbookmark/:id', authentication, ArticleC.bookmark)
router.patch('/removebookmark/:id', authentication, ArticleC.unBookmark)
router.patch('/:id', authentication, authorization, multer.single('image'), sendUploadToGCS, ArticleC.update)

module.exports = router