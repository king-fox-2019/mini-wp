const { decodeToken } = require('../helpers/jwt')
const Article = require('../models/article')
const User = require('../models/user')

const authentication = (req, res, next) => {
  
  User.findById(decodeToken(req.headers.access_token).id)
    .then(user => {
      if (!user) {
        throw {status: 401, msg: `please login first`}
      } else {
        req.loggedUser = user
        console.log('kirim loggeduser', req.loggedUser)
        next()
      }
    })
    .catch(next)
}

const authorization = (req, res, next) => { //article yg di delete/edit hrs milik user yg lg login
  let { id } = req.params //id article
  console.log(req.params);
  console.log("masuk sinis")
  Article.findById(id)
  .then(article => {
    if (!article) {
      next({status : 404, message : `article not found`})
    } else if (String(article.user) === String(req.loggedUser.id)) {
      
      next()
    } else {
      console.log(typeof article.user, article.user);
      console.log(typeof req.loggedUser.id, req.loggedUser.id);
      
      next({ status : 403, message : `not authorized`})
    }
  })
}

module.exports = {
  authentication,
  authorization
}