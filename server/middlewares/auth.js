const { decode } = require('../helpers/tokenHandler')
const { User, Article } = require('../models')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = decode(req.headers.access_token)
      User.findOne({ _id: payload.id, email: payload.email })
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else throw { status: 404, message: 'User not found' }
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  },
  authorize(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if (article) {
          if (article.author == req.user.id) {
            req.article = article
            next()
          } else
            throw {
              status: 403,
              message: 'Unauthorized access to this article'
            }
        } else throw { status: 404, message: 'Article not found' }
      })
      .catch(next)
  }
}
