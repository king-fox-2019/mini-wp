const routes = require('express').Router()

const articleRoutes = require('./article-routes')
const userRoutes = require('./user-routes')


routes.get('/', function(req, res, next) {
  res.send('Server Alive!')
})
routes.use('/articles', articleRoutes)
routes.use('/users', userRoutes)


module.exports = routes
