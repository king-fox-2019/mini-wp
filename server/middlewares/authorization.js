'use strict'; 
const { Article } = require('../models');

module.exports = (req, res, next) => {
    Article
        .findById(req.body.id)
        .populate({
            path: 'author',
            select: '-passowrd'
        })
        .then(data=> {
            if(data.author._id == req.token.id ) {
                next()
            } else {
                next({ isThrow: true, status: 401, message: "NOT YOUR ARTICLE" })
            }
        })
        .catch(next)
}