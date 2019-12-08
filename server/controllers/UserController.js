const User = require('../models/user')
const { comparePassword } = require('../helpers/passwordEncryptor')
const { generateToken } = require('../helpers/tokenMaker')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register(req, res, next) {
        let objUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(objUser)
            .then(result => {
                let payload = {
                    id: result._id,
                    email: result.email
                }
                let token = generateToken(payload)
                res.status(201).json({ token, email: result.email })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user && comparePassword(req.body.password, user.password)) {
                let payload = {
                    id: user._id,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({ token, email: user.email })
            } else {
                next({ status: 400, message: "wrong email or password" })
            }
        })
        .catch(next)
    }

    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let payload = null
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                console.log(ticket);
                payload = ticket.getPayload()
                let email = payload.email

                return User.findOne({ email })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    return User.create({
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                const token = generateToken({
                    id: user._id,
                    email: user.email
                })
                res.status(200).json({ token, email: user.email })
            })
            .catch(next)
    }
}

module.exports = UserController