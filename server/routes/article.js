'use strict';
const route = require('express').Router();
const controller = require('../controllers/article');

route.get('/', controller.showArticle);
route.post('/', controller.addArticle);
route.patch('/', controller.edit);

module.exports = route