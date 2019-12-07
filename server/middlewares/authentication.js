'use strict';

const { User } =  require('../models')
const jwt = require('../helpers/jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.headers.token) {
        let decoded = jwt.verify(req.headers.token)
        User
            .findOne( { _id: decoded.id } )
            .then(user=> {
                if(!user) {
                    next({ isThrow: true, status: 404, message: "USER NOT FOUND!" })
                } else {
                    req.token = decoded
                    next()
                }
            })
    } else {
        next({isThrow: true, status: 401, message: "YOU HAVE TO LOGIN FIRST!"})
    }
}