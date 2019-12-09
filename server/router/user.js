const routes = require('express').Router()
const UserController = require('../controllers/user')

routes.post('/login', UserController.Login)
routes.post('/', UserController.Register)
routes.post('/google', UserController.googleSignIn)

module.exports = routes