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
    static register(req, res, next) {
        let { email, password } = req.body
        User.create({ email, password })
            .then(user => {
                res.status(200).json({token: generateToken({id: user.id})})
            })
            .catch(next)
    }
    static login(req, res, next) {
        let { email, password} = req.body
        User.findOne({ email })
            .then(user => {
                if(!user){
                    next({status: 400, message: "Invalid email or password"})
                } else if(!compare(password, user.password)) {
                    next({status: 400, message: "Invalid password or email"})
                } else {
                    res.status(200).json({token: generateToken({id: user.id})})
                }
            })
            .catch(next)
    }
}

module.exports = UserController