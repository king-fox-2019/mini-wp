const User = require('../models/User')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.G_SIGNIN_CLIENT_ID)
const {generateAccessToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')


class UserController {

   static register(req, res, next) {
      
      const {name, username, email, password} = req.body

      User
      .create({name, username, email, password})
      .then(user => {
         const payload = {userId: user._id}
         const access_token = generateAccessToken(payload)
         res.status(201).json({message: 'User creation success', access_token})
      })
   }

   static login(req, res, next) {
      
      const {email, password} = req.body

      User
      .findOne({email})
      .then(user => {
         const error = {
            errorCode: 400,
            message: 'Invalid email and or password'
         }

         if(!user) throw error
         else if(!comparePassword(password, user.password)) throw error
         else res.status(200).json({
            access_token: generateAccessToken({userId: user._id})
         })
      })
   }

   static googleSignIn(req, res, next) {

      let userData = {}
      let createNew = false

      client.verifyIdToken({
         idToken: req.body.id_token,
         audience: process.env.G_SIGNIN_CLIENT_ID
      })
      .then(ticket => {
         const payload = ticket.getPayload()

         userData.name = payload.name,
         userData.username = payload.email.split('@')[0]
         userData.email = payload.email
         userData.image = (payload.picture != '') ? payload.picture : ''

         User.findOne({email: ticket.getPayload.email})
      })
      .then(user => {
         if(!user) {
            // create
            createNew = true

            return User.create(userData)
         }
         else {
            // promise token
            const payload = {userId: user._id}

            return generateAccessToken(payload)
         }
      })
      .then(signInResult => {
         if(!createNew) {
            res.status(200).json({signInResult})
         }
         else {
            const payload = {userId: signInResult._id}
            const token = generateAccessToken(payload)
            res.status(200).json({token})
         }
      })
      .catch(next)
   }

   static uploadImage(req, res, next) {}
}

module.exports = UserController