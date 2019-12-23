const router = require('express').Router()
const CommentController = require('../controllers/comment')
const Authenticate = require('../middlewares/authenticate')
const AuthorizationComment = require('../middlewares/authorization').comment

// create comment
router.post('/', Authenticate, CommentController.createComment)

// get all comments
router.get('/', Authenticate, CommentController.getAllComment)

// get one comment
router.get('/:id', Authenticate, AuthorizationComment,CommentController.getOneComment)

// edit comment
router.put('/:id', Authenticate, AuthorizationComment, CommentController.editComment)

// delete commnet
router.delete('/:id', Authenticate, AuthorizationComment, CommentController.deleteComment)

module.exports = router