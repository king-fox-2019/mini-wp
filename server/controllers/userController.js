'use strict'

const { User, Article } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const randomPassword = require('../helpers/randomPassword')

class userController {
  static register(req, res, next) {
    const { email, password, username } = req.body
    User
      .create({ email, password, username })
      .then(user => {
        let token = generateToken({ id: user.id })
        let data = {
          id: user._id,
          username: user.username,
          email: user.email,
          token
        }
        res.status(201).json(data)
      })
      .catch(next)
  }

  static login(req, res, next) {
    let value = { email: req.body.email }
    User
      .findOne(value)
      .then(userData => {
        if (userData && comparePassword(req.body.password, userData.password)) {
          let token = generateToken({ id: userData.id })
          let user = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            token
          }
          res.status(200).json(user)
        } else {
          next({ status: 400, message: `Password / Username is wrong` })
          // res.status(400).json({ message: `Password/Username is wrong` })
        }
      })
      .catch(next)
  }

  static read(req, res, next) {
    let keys = ['title']
    let value = {
      userId: req.decoded._id
    }

    keys.forEach(element => {
      if (req.query[element]) {
        value[element] = { $regex: `${req.query[element]}` }
      }
    })

    Article
      .find(value).sort({ created_at: -1 }).populate('userId')
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static cekSession(req, res, next) {
    res.status(200).json(req.decoded._id)
  }

  static googleSignIn(req, res, next) {
    User.findOne({
      email: req.decoded.email
    })
      .then(userData => {
        if (userData) {
          return userData
        } else {
          return User.create({
            username: req.decoded.given_name,
            email: req.decoded.email,
            password: randomPassword()
          })
        }
      })
      .then(userData => {
        if (userData) {
          let token = generateToken({ id: userData.id })
          let user = {
            username: userData.username,
            email: userData.email,
            token
          }
          res.status(200).json(user)
        }
      })
      .catch(next)
  }

}

module.exports = userController

