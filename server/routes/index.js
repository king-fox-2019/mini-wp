const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.showAll)
router.get('/:id', TodoController.showOne)
router.post('/', TodoController.create)
router.patch('/:id', TodoController.edit)
router.delete('/:id', TodoController.remove)

module.exports = router