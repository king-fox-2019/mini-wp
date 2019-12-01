const { decode } = require('../helpers/tokenHandler')
const { User } = require('../models')

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
  }
}
