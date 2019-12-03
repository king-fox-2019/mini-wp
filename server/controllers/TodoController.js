const Todo = require('../models/Todo')

class TodoController{
  static showAll(req, res, next){
    Todo.find({})
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static showOne(req, res, next){
    Todo.findById(req.params.id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static create(req, res, next){
    let { title, content} = req.body
    Todo.create({ title, content })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static edit(req, res, next){
    const { title, content } = req.body
    const updateObj = { title, content }
    const condition = { _id: req.params.id}
    Todo.findOneAndUpdate(condition, updateObj, {new: true})
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static remove(req, res, next){
    Todo.deleteOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.deletedCount == 0){
          throw new Error(`Todo not found`)
        }
        else{
          res.status(200).json(data)
        }
      })
      .catch(next)
  }
}

module.exports = TodoController