const router = require('express').Router()
const ControllerComment = require('../controllers/comments')
const authenticate = require('../middlewares/authenticate')

router.post('/', authenticate, ControllerComment.add)

module.exports = router