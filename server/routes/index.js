const router = require('express').Router()
const userRoutes = require('./user')
const articleRoutes = require('./article')

router.use('/users',userRoutes)
router.use('/articles',articleRoutes)

module.exports = router