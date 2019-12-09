const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt'),
    { OAuth2Client } = require('google-auth-library'),
    mailer = require("../helpers/nodemailer")

class UserController {

    static register(req, res, next) {
        let { name, email, password } = req.body
        User.create({ name, email, password })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body);
        let { email, password } = req.body
        User.findOne({
            email: email
        })
            .then(user => {
                if (!user) {
                    next({ status: 403, message: 'Invalid password or email' })
                } else {

                    let authPass = compare(password, user.password)
                    if (authPass) {
                        let name = user.name,
                            email = user.email,
                            _id = user._id;

                        const token = generateToken({
                            name: name,
                            email: email,
                            id: _id
                        })
                        res.status(200).json({ token, name, email })
                    } else {
                        next({ status: 403, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        const clientId = process.env.GOOGLE_CLIENT_ID
        let googlePayload = ''
        const client = new OAuth2Client(clientId)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientId
        })
            .then(ticket => {
                googlePayload = ticket.getPayload()
                return User.findOne({
                    email: googlePayload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: googlePayload.name,
                        email: googlePayload.email,
                        password: process.env.PASSWORD_USER,
                        isGoogle: true
                    })
                }
            })
            .then(user => {
                let name = user.name,
                    email = user.email,
                    id = user._id;
                let payload = {
                    id: id,
                    name: name,
                    email: email
                },
                    token = generateToken(payload)
                res.status(200).json({ token, name, email })
            })
            .catch(next)
    }

    static myBookmark(req, res, next) {
        let author = req.loggedUser.id
        User.findOne({ _id: author }, 'bookmarks')
            .populate('bookmarks')
            .then(bookmark => {
                res.status(200).json(bookmark)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        User.find()
            .then(users => {

                res.status(200).json(users);
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let id = req.loggedUser.id
        User.findById(id)
            .populate({ path: 'articles', match: { draft: false } })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        let { id } = req.params
        User.remove({ _id: author })
            .then(userdeleted => {
                res.status(200).json(userdeleted)
            })
            .catch(next)
    }

    static subscribe(req, res, next) {
        let email = req.loggedUser.email,
            name = req.loggedUser.name;
        return mailer(email, name)
    }
}

module.exports = UserController