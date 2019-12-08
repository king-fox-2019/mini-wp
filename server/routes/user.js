'use strict';

const express = require('express');
const userController = require('../controllers/userController');

const routes = express.Router();

routes.post('/', userController.register)
routes.post('/', userController.login)
routes.post('/', userController.forgetPassword)

module.exports = routes;