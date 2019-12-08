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
      fullName: fullName || undefined
    })
      .then(user => {
        const access_token = encode(user)
        res.status(200).json({
          message: 'User registered',
          data: {
            user: {
              username: user.username,
              email: user.email,
              password,
              fullName: user.fullName
            },
            access_token
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
    res.status(200).json({
      data: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        fullName: req.user.fullName
      }
    })
  }

  static updateUserFullName(req, res, next) {
    User.findByIdAndUpdate(
      req.user._id,
      { fullName: req.body.fullName },
      { new: true, omitUndefined: true, runValidators: true }
    )
      .then(user => {
        res.status(200).json({
          message: 'Full name updated',
          data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName
          }
        })
      })
      .catch(next)
  }
}

module.exports = UserController
