'use strict'

const express = require('express')
const router = express.Router()
const article = require('../controllers/articleController')

router.post('/', article.create)
router.get('/', article.read)
router.put('/:id', article.update)
router.delete('/:id', article.delete)

module.exports = router