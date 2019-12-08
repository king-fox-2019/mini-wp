const Todo = require('../models/Todo')
const {verify} = require('../helpers/token')

class Auth{
  static authenticate(req, res, next){
    try{
      let token = verify(req.headers.access_token)
      req.userId = token.userId
      next()
    }
    catch(err){
      next(err)
    }
  }
  static authorize(req, res, next){
    Todo.findOne({
      _id: req.params.id
    })
      .then((data) => {
        if (data.author == req.userId){
          next()
        }
        else {
          next('You are not authorized')
        }
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Auth