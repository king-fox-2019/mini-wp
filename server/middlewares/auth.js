const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Article = require('../models/article')

function authentication (req, res, next){
  try {
    let decodedToken = verifyToken(req.headers.token)
    User.findById(decodedToken._id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          next()
        }
        else{
          next({ status: 401, message: 'Authentication Failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

function authorization (req, res, next){
  let { articleId } = req.params 
  Article.findById(articleId)
    .then(article => {
      if(!article){
        next({ status: 404, message: 'Not Found' })
      }
      else if(article.userId == req.loggedUser._id){
        next()
      }
      else{
        next({ status: 403, message: 'Not Authorize' })
      }
    })
    .catch(err => {
      next({ status: 403, message: err })
    })
}

module.exports = { authorization, authentication }