'use strict'
const User = require('../models/User')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserCon
 {
    static register(req, res, next) {
        const {name, email, password, phoneNumber} = req.body
        User.
            create({
                name,
                email,
                password,
                phoneNumber
            })
            .then(user => {
                let token = generateToken(user)  
                let {email,_id,name} = user
                res.status(201).json({
                    message : 'login succesfully',
                    token : token,
                    user : {
                        email,
                        _id,
                        name
                    }                        
                })
            })
            .catch(next)
    }
    
    static login(req, res, next) {
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                if ( comparePassword(req.body.password, user.password)  ) {               
                    let token = generateToken(user)  
                    let {email,_id,name} = user
                    res.status(200).json({
                        message : 'login succesfully',
                        token : token,
                        user : {
                            email,
                            _id,
                            name
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }

    static loginGoogle(req, res, next) { 
        let { email} = req.decoded
        User.findOne({
            email : email
        })
        .then( user => {
            let password = email+'custom'
            let spl = email.split('@')
            let name = spl[0]
            let phoneNumber = ''
            if (!user) {
                return User.create({
                    email, 
                    password,
                    name,
                    phoneNumber
                })
            } else {
                return user
            }
        })
        .then(user => {      
            let {email,_id,name} = user      
            let token = generateToken(user)  
            console.log(token)
            res.json({
                status : 200,
                message : 'login success',
                token : token,
                user : {
                    email,
                    _id,
                    name
                }  
            })                     
        })
        .catch(next)                    
    }    
}

module.exports = UserCon
