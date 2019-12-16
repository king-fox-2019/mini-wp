const { genToken } = require('../helpers/jwt')
const { deHash } = require('../helpers/bcrypt')
const User = require('../model/user')

class Controller {

    static googleOAuth(req, res, next) {
        let name, email;
        client
            .verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.Client_ID
            })
            .then(ticket => {
                // send token to client
                name = ticket.getPayload().name;
                email = ticket.getPayload().email;
                return User.findOne({ email: email })
            })
            .then((user) => {
                if (!user || user.length) {
                    return User.create({
                        name: name,
                        email: email,
                        password: email
                    })
                } else {
                    return user
                }
            })
            .then((user) => {
                let token = genToken({ id: user._id, name: user.name })
                res.status(200).json({ token })
            })
            .catch(next)
    }

    static register(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then((result) => {
                let token = genToken({ id: result._id, name: result.name, email: result.email })
                res.status(201).json({ token, result })
            })
            .catch(next);
    }

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({ email: req.body.email })
            .then((user) => {
                // console.log(user);
                if (!user || user.length == 0) {
                    next({ status: 404, msg: "User not found" })
                } else {
                    let userPassword = deHash(req.body.password, user.password)
                    if (userPassword) {
                        let token = genToken({ id: user._id, name: user.name, email: user.email })
                        res.status(201).json({ token, user })
                    } else {
                        next({ status: 403, msg: "Password Incorrect" })
                    }
                }
            })
            .catch(next);
    }

    static list(req, res, next) {
        User.find()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(next);
    }
}

module.exports = Controller