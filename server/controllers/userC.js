const { User } = require('../models')
const { compare } = require('../helpers/passwordHandler')

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
    }).then(user => {
      if (user && compare(password, user.password)) {
      }
    })
  }
}

module.exports = UserController
