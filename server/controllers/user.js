if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const User = require('../models/User')
const { encrypt, compare } = require('../helpers/encrypt')
const { generate } = require('../helpers/token')
class UserController{
    static Login(req, res, next){
        const { email, password } = req.body
        User.findOne({email})
            .then(user => {
                if(user && compare(password, user.password)){
                    let access_token = generate({ id:user._id })
                    res.status(200).json({ access_token, email:user.email })
                }else{
                    next({code:400, message : 'wrong username or password'})
                }
            })
            .catch(next)
    }
    static Register(req, res, next){
        let { email,username, password } = req.body
        password = encrypt(password)
        User.create({ email, username, password })
            .then(user => {
                let access_token = generate({ id:user._id })
                res.status(200).json({ access_token, email: user.email })
            })
            .catch(next)
    }
    static googleSignIn(req, res, next) {
        const { token } = req.body
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(process.env.CLIENT_ID);
    
        let payload, username, email, password
        client
          .verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
          })
          .then(ticket => {
            payload = ticket.getPayload()
            username = payload.email.split('@')
            username = username[0]
            email = payload.email
            password = process.env.PASSWORD
    
            return User
              .findOne({ email })
          })
          .then(user => {
            if (!user) {
              User
                .create({
                  username, email, password
                })
                .then(user => {
                  const id = user._id
                  const payload = { id }
                  const access_token = generate(payload)
    
                  res.status(201).json({
                    access_token, email : user.email
                  })
                })
                .catch(next)
            }
            else {
              payload = {
                id: user._id
              }
              const access_token = generate(payload)
    
              res.status(200).json({
                access_token, email:user.email
              })
            }
          })
          .catch(next)
      }
}
module.exports = UserController