const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt')
    

class UserController {
    static all(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    }
    static create(req, res, next) {
        let { email, password, name } = req.body
        User.create({ email, password, name })
            .then( user => {
                res.status(201).json(user)
            })
            .catch(next)
    }
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ email: email })
            .then(user => {
                if(!user){
                    next({ status: 401, message: 'Invalid email or password.' })
                } else {
                    if(!compare(password, user.password)){
                        next({ status: 401, message: 'Invalid password or email.' })
                    } else {
                        res.status(200).json({ token: generateToken({ id: user.id }) })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController