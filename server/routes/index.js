const routes = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)

routes.use(authenticate)
routes.use('/user', require('./user'))
routes.use('/articles', require('./articles'))

module.exports = routes
