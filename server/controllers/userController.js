const User = require('../models/user')
const {generateToken, verifyToken} = require('../helpers/jwt')
const {hash, check} = require('../helpers/bcrypt')
const Article = require('../models/article')

class UserController {

    static create(req, res, next) {
        console.log(req.body)
        User.create(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static google(req, res, next) {
        User.findOne({
          email : req.headers.email
        })
          .then((user) => {
              if (user) {
                  return user
              } else {
                  return User.create({
                  name: req.headers.name,
                  email: req.headers.email,
                  password: process.env.SECRET
                  })
              }
          })
          .then((user) => {
              let payload = {
                  id : user._id,
                  name: user.name,
              }
              let token = generateToken(payload)
              res.status(200).json({token, name:user.name, email:user.email})

          })
          .catch(next)
    }
    static signin(req, res, next) {
        const { email, password } = req.body
        User.findOne({email})
            .then(user => {
                if (!user) throw {message: 'invalid email/password'}
                let isPassword = check(password, user.password)
                if (!isPassword) throw {message: 'invalid email/password'}
                let payload = {
                    _id: user._id,
                    name: user.name,
                }
                let token = generateToken(payload)
                res.status(200).json({token, name:user.name, email:user.email})
            })
            .catch(next)
    }

    static update(req, res, next) {
        const obj = req.body
        const _id = req.loggedUser._id
        User.findByIdAndUpdate({_id},obj, {new: true})
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.loggedUser._id
        User.findByIdAndDelete(_id)
            .then(response=> {
                return Article.deleteMany({userId: response._id})
            })
            .then(response => {
                res.status(200).json({message: 'success delete'})
            })
            .catch(next)
    }
}

module.exports = UserController