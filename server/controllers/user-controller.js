const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')


class UserController {
  static register(req, res, next) {
    User.create(req.body)
      .then(function (user) {
				jwt.sign({ id: user._id }, process.env.JWT_SECRET, function (err, token) {
					if (err) throw err
					else res.status(201).json({ access_token: token })
				})
      })
      .catch(next)
  }

  static login(req, res, next) {
    let userObj = {}
    User.findOne({ email: req.body.email })
      .then(function (user) {
        if (!user) throw { name: 'FailedLogin', message: 'email or password is wrong' }
        else {
          userObj = user
          return bcrypt.compare(req.body.password, user.password)
        }
      })
      .then(function (result) {
        if (!result) throw { name: 'FailedLogin', message: 'email or password is wrong' }
        else {
          jwt.sign({ id: userObj._id }, process.env.JWT_SECRET, function (err, token) {
            if (err) throw err
            else res.json({ access_token: token })
          })
        }
      })
      .catch(next)
  }

  static googleLogin(req, res, next) {
    res.json({ message: 'you are on login google' })
  }
}


module.exports = { UserController }
