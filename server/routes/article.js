'use strict';
const route = require('express').Router();
const controller = require('../controllers/article');
const authentication = require('../middlewares/authentication');

route.get('/', controller.showArticle);
route.use(authentication);
route.post('/', controller.addArticle);
route.patch('/', controller.edit);

module.exports = route