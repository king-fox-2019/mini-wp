const routes = require('express').Router()
const { UserController } = require('../controllers')

routes.post('/signup', UserController.signUp)
routes.post('/signin')

module.exports = routes
