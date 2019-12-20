const User = require('../models/User')
const { verifyHash } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body

      let user = await User.create({ name, email, password })
      let access_token = generateToken({ id: user._id, name, email })

      res.status(201).json({
        message: 'Registered as a user!', user, access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      console.log('ini user pas login', email, password);

      let user = await User.findOne({ email })

      if (!user) throw {
        status: 404,
        message: 'Wrong email address/password!'
      }
      if (!verifyHash(password, user.password)) {
        throw {
          status: 404,
          message: 'Wrong email address/password!'
        }
      } else {
        let access_token = generateToken({ id: user._id, name: user.name, email })

        res.status(201).json({
          message: 'Successfully logged in!', user, access_token
        })
      }
    } catch (error) { 
      next(error) 
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const { googleidtoken } = req.headers
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

      const ticket = await client.verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      let payload = ticket.getPayload()

      let name = payload.name,
          email = payload.email,
          password = process.env.DEFAULT_USER_PASSWORD,
          picture = payload.picture

      let user = await User.findOne({ email })

      if (!user) {
        user = User.create({
          name, email, password, picture
        })
        let access_token = generateToken({ id: user._id, name, email })

        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      } else {
        let access_token = generateToken({ id: user._id, name, email })

        res.status(200).json({
          message: 'Successfully logged in!',
          access_token, user
        })
      }
    } catch (error) { 
      next(error) 
    }
  }

  static async fetchOne(req, res, next) {
    try {
      let user = await User.findById(req.loggedUser.id)
      res.status(200).json(user)
    } 
    catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerUser