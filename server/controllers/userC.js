const { User } = require('../models')
const { compare } = require('../helpers/passwordHandler')
const { encode } = require('../helpers/tokenHandler')

class UserController {
  static signUp(req, res, next) {
    const { username, email, password, fullName } = req.body
    User.create({
      username,
      email,
      password,
      fullName
    })
      .then(user => {
        res.status(200).json({
          message: 'User registered',
          data: {
            username: user.username,
            email: user.email,
            password,
            fullName: user.fullName
          }
        })
      })
      .catch(next)
  }

  static signIn(req, res, next) {
    const { username, email, emailUsername, password } = req.body
    User.findOne({
      $or: [
        { username: username || emailUsername },
        { email: email || emailUsername }
      ]
    })
      .then(user => {
        try {
          if (user && compare(password, user.password)) {
            const access_token = encode(user)
            res.status(200).json({
              Message: 'Sign in success',
              data: { access_token }
            })
          } else {
            throw 'err'
          }
        } catch (error) {
          throw { status: 422, message: 'Wrong username/email/password' }
        }
      })
      .catch(next)
  }

  static checkSession(req, res, next) {
    res.status
  }
}

module.exports = UserController
