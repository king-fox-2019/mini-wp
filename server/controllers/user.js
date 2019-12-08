const UserModel = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    google(req,res,next){
        UserModel.findOne({
            email : req.decoded.email
        })
        .then(user=>{
            let { name, email, picture } = req.decoded
            if(user){
                let payload = { email: user.email, id: user._id, name : user.name }
                let token = generateToken(payload)
                res.status(200).json({ token , user })
            } else {
                res.status(200).json({ name, email, picture })
            }
        })
        .catch(next)
    },
    register(req, res, next) {
        const { name, password, email, image } = req.body
        UserModel.create({ name, password, email, image })
            .then(user => {
                let payload = { email: user.email, id: user._id, name : user.name }
                let token = generateToken(payload)
                res.status(201).json({ token , user })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { email: user.email, id: user._id, name: user.name }
                        let token = generateToken(payload)
                        res.status(200).json({ token, user })
                    } else {
                        next({ status: 400, message: 'Wrong Password' })
                    }
                } else {
                    next({ status: 404, message: 'Email Not Found' })
                }
            })
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    deleted(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    }
}