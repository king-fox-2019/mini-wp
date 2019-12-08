const router = require('express').Router()
const routeUsers = require('./users')
const routeArticles = require('./articles')

router.use('/users', routeUsers)

router.use('/articles', routeArticles)

module.exports = router