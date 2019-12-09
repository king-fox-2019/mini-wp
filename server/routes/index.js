const router = require('express').Router()
const article = require('./article')
const user = require('./user')


router.get('/', (req, res) => res.send(`Hello World - from perspective <3`))
router.use('/articles', article)
router.use('/users', user)


module.exports = router