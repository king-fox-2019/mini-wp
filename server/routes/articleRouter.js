'use strict'

const express = require('express')
const router = express.Router()
const article = require('../controllers/articleController')
const authorization = require('../middlewares/authorization')

router.post('/', article.create)
router.get('/', article.read)
router.put('/:id', authorization, article.update)
router.delete('/:id', authorization, article.delete)

module.exports = router