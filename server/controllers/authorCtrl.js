const Author = require('../models/author'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt'),
    { OAuth2Client } = require('google-auth-library');

class AuthorController {

    static register(req, res, next) {
        let { username, email, password } = req.body
        Author.create({ username, email, password })
            .then(newAuthor => {
                res.status(201).json(newAuthor)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        Author.findOne({
            email: email
        })
            .then(author => {
                if (!author) {
                    next({ status: 403, message: 'Invalid email or password.' })
                } else {
                    let authPass = compare(password, author.password)
                    if (authPass) {
                        console.log(author.username)
                        const authorName = author.username
                        const token = generateToken({
                            id: author._id
                        })
                        res.status(200).json({ token, authorName })
                    } else {
                        next({ status: 403, message: 'Invalid email or password.' })
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
                return Author.findOne({
                    email: googlePayload.email
                })
            })
            .then(author => {
                if (author) {
                    return author
                } else {
                    return Author.create({
                        username: googlePayload.username,
                        email: googlePayload.email,
                        password: "google",
                        isGoogle: true
                    })
                }
            })
            .then(author => {

                let payload = {
                    id: author._id,
                    username: author.username
                },
                    token = generateToken(payload)

                res.status(200).json({ token })
            })
            .catch(next)
    }

}

module.exports = AuthorController