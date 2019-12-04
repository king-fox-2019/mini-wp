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
                    console.log('TOKEN INVALID / USER NOT FOUND')
                } else {
                    req.token = decoded
                    next()
                }
            })
    } else {
        console.log('U have to login')
    }
}