'use strict'
const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports = {
    authenticate : (req, res, next) => {
        try {    
            const user = verifyToken(req.headers.token)  
            User.find({"_id": user._id})
            .then (User => {    
                if (User) {
                    req.user = user.user
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        Article.findById(req.params.id)
            .then(order => {
                if (order) { 
                    if (String(order.user_id) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }
            })
            .catch(next)
    }    
} 