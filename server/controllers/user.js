const User = require('../models/user')
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

class UserController{
    static registerUser(req,res,next){
        const {username, email, password} = req.body
        User.create({
            username,
            email,
            password 
        })
        .then(({_id, username, email}) => {
            let filterUser = {
                id: _id,
                username,
                email
            }
            res.status(201).json(filterUser)
        })
        .catch(err => {
            next(err)
        })
    }

    static loginUser(req,res,next){
        const {email,password} = req.body
        User.findOne({email})
            .then(user => {
                if(user){
                    let valid = bcrypt.compare(password, user.password)
                    if(valid){
                        let filterUser = {
                            username: user.username,
                            email: user.email
                        }
                        let token = jwt.generateToken({id: user._id})
                        res.status(200).json({
                            user: filterUser,
                            token
                        })
                    }else{
                        throw({
                            status: 400,
                            message: 'Your password is wrong'
                        })
                    }
                }else{
                    throw({
                        status: 400,
                        message: 'There is no user with that email!'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllUser(req,res,next){
        User.find()
            .then(users => {
                let arrUser = []
                users.forEach(user => {
                    let filterUser = {}
                    filterUser.id = user._id
                    filterUser.email = user.email
                    filterUser.username = user.username
                    arrUser.push(filterUser)
                });
                res.status(200).json(arrUser)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneUser(req,res,next){
        User.findOne({
            _id: req.params.id
        })
        .then(user => {
            if(user){
                let filterUser = { id: user._id, username: user.username, email: user.email}
                res.status(200).json(filterUser)
            }else{
                next({
                    status: 404,
                    message: 'There is no user with that id'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = UserController