const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static googleSignIn(req, res, next) {

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null
    client.verifyIdToken({

      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {

        payload = ticket.getPayload()
        let email = payload.email
        return User.findOne({ email })
      })
      .then(user => {

        if (user) {
          return user
        } else {
          return User.create({
            email: payload.email,
            password: process.env.DEFAULT_PASSWORD
          })
        }
      })
      .then(user => {
        const id = user.id
        const email = user.email
        const token = generateToken({
          id: user._id,
          email: user.email
        })
        res.status(200).json({ token, id, email })
      })
      .catch(next)
  }


  static register(req, res, next) {

    const { name, email, password } = req.body

    User.create({
      name,
      email,
      password
    })
      .then(user => {

        const { _id, email } = user

        let token = generateToken({
          _id,
          email
        })


        const result = { token, _id, email }

        res.status(201).json(result)


      })
      .catch(next)
  }

  static login(req, res, next) {

    User.findOne({

      email: req.body.email
    })
      .then(user => {




        if (!user) {
          throw { status: 404, message: `you have to register first` }
        } else {
          let password = req.body.password
          let passwordDB = user.password
          let match = compare(password, passwordDB)
          if (match) {

            const id = user._id
            const email = user.email
            let token = generateToken({
              id: user._id,
              email: user.email
            })
            res.status(200).json({ token, id, email })
          } else {
            throw { status: 400, message: `username/password wrong` }
          }
        }
      })
      .catch(next)
  }

}

module.exports = UserController