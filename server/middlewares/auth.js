const {verifyAccessToken} = require('../helpers/jwt')
const Article = require('../models/Article')

function authentication(req, res, next) {
   if(!req.headers.access_token) throw {
      errorCode: 400,
      message: 'This action requires authentication'
   }

   try {
      verifyAccessToken(req.headers.access_token, (err, decoded) => {
         if(err) {
            if(err.name == 'TokenExpiredError') throw {
               errorCode: 400,
               message: 'Your authentication has expired, please log in'
            }
            else if(err.name == 'JsonWebTokenError') throw {
               errorCode: 400,
               message: 'Your authentication is invalid, please log in'
            }
         }
         else {
            req.decoded = decoded
            next()
         }
      })
   }
   catch(err) {
      next(err)
   }
}

function authorization(req, res, next) {
   if(!req.params.id) next({
      errorCode: 400,
      message: 'Please request with a proper URL'
   })

   Article
   .find({_id: req.params.id, user: req.decoded.userId})
   .then(article => {
      if(!article) throw {
         errorCode: 400,
         message: 'You are not authorized to access this API'
      }
      else next()
   })
   .catch(next)
}

module.exports = {
   authentication,
   authorization
}