'use strict';

const express = require('express');
const articleController = require('../controllers/articleController');
const cloudUpload = require('../middlewares/gcsUpload');
const { authenticating, authorizingArticle } = require('../middlewares/auth');

const routes = express.Router();

routes.use(authenticating)
routes.post('/', cloudUpload.single('featuredImage'), articleController.create)
routes.get('/', articleController.getAll)
routes.use(authorizingArticle)
routes.put('/', articleController.edit)
routes.patch('/', articleController.patch)
routes.delete('/', articleController.remove)

module.exports = routes;