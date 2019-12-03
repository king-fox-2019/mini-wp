const router = require('express').Router()
const Controller = require('../controllers/articleC')

router.get('/article', Controller.showAll)

router.get('/article/:id', Controller.showOne)

router.post('/article', Controller.createArticle)

router.delete('/article/:id', Controller.delete)

router.put('/article/:id', Controller.update)

module.exports = router