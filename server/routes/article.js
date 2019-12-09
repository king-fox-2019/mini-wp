'use strict';

const express = require('express');
const articleController = require('../controllers/articleController');
const { authenticating, authorizingArticle } = require('../middlewares/auth');

const routes = express.Router();

routes.use(authenticating)
routes.post('/', articleController.create)
routes.get('/', articleController.getAll)
routes.use(authorizingArticle)
routes.put('/', articleController.edit)
routes.patch('/', articleController.patch)
routes.delete('/', articleController.remove)

module.exports = routes;