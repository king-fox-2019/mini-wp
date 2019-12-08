'use strict';

const express = require('express');
const articleController = require('../controllers/articleController');

const routes = express.Router();

routes.post('/', articleController.create)
routes.get('/', articleController.getAll)
routes.put('/', articleController.edit)
routes.patch('/', articleController.patch)
routes.delete('/', articleController.remove)

module.exports = routes;