const router = require('express').Router()
const userRoutes = require('./user')
const projectRoutes = require('./project')

router.use('/users',userRoutes)
router.use('/projects',projectRoutes)

module.exports = router