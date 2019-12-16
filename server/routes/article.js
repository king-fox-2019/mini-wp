'use strict'
const express = require('express')
const article = express.Router()
const { authenticate, authorize }  = require('../middlewares/auth')
const gcsUpload = require('../middlewares/googleUpload')
const Controller = require('../controllers/ArticleCon')


article.use(authenticate)
article.get('/', Controller.findAll)
article.get('/:id', Controller.findOne)
article.post('/',gcsUpload.single('img'),Controller.addArticle)
article.delete('/:id' ,authorize,Controller.deleteArticle)
article.put('/:id' ,authorize,Controller.updateArticle)
article.patch('/:id' ,authorize,Controller.updateStar)

module.exports = article