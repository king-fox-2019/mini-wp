const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const {compare } = require('../helpers/passwordHandler')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static googleSignIn(req, res, next) {
    console.log(req.body, "googleeeeeeeeeeee");
    
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    let payload = null
    client.verifyIdToken({
    
      idToken : req.body.idToken,
      audience : process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      console.log(ticket, "tickeeeeeeet");
      
      payload = ticket.getPayload()
      let email = payload.email
      // console.log(payload);
      return User.findOne({ email })
    })
    .then(user => {
      console.log(user, "user google sign in");
      
      if (user) {
        return user
      } else {
          return User.create({
            email: payload.email,
            password : process.env.DEFAULT_PASSWORD
          })
      }
    })
    .then(user => {
      const token = generateToken({
        id : user._id,
        email : user.email
      })
      console.log(token, "TOKEEEEEEEEEEEEN");
      res.status(200).json({token})
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
      console.log(user);

      const { _id, email } = user

      let token = generateToken({
          _id,
          email
      })
      res.status(200).json({ token, _id, email })


    })
    .catch(next)
  }

  static login(req, res, next) {
    console.log(req.body);
    
    User.findOne({

      email : req.body.email
    })
    .then(user => {
      console.log(user);
      console.log(user.password, "user.password");
      console.log(req.body.password, "req.body");
      console.log(req.body.email, "req.email");
      
      
    
      
      if(!user) {
        throw {status : 404, message : `you have to register first`}
      } else {
        let password = req.body.password
        let passwordDB = user.password
        let match = compare(password, passwordDB)
        if (match) {
          let token = generateToken({
            id : user._id,
            email : user.email
          })
          res.status(200).json({ token })
        } else {
          throw {status : 400, message : `username/password wrong`}
        }
      }
    })
    .catch(next)
  }

}

module.exports = UserController