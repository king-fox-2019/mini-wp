'use strict';

const jwt = require('../helpers/jwt');
const User = require('../models/user');
const Article = require('../models/article');



const authenticating = (req, res, next) => {
    try {
        req.userId = jwt.decodeToken(req.headers.access_token || '').userId
        User.findOne({
            _id: req.userId
        })
            .then(user => {
                if (!user) {
                    // next({status: 401, message: "Authentication Error !!!"})
                    // throw new Error('Authentication Error !!!')
                    const newError = new Error()
                    newError.status = 555
                    newError.message = 'ini custom error'
                    throw newError
                }
                else {
                    next()
                }
            })
            .catch(next)
    }
    catch(err) {
        next(err)
    }
}

const authorizingArticle = (req, res, next) => {
    // req.userId = jwt.decodeToken(req.headers.access_token).userId
    try {
        Article.findOne({
            _id: req.params.articleId
        })
            .then(article => {
                if (!article) {
                    throw new Error('Article Not Found !!!')
                }
                else if (article.author !== req.userId) {
                    throw new Error('Not Authorized !!!')
                }
                else {
                    next()
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticating,
    authorizingArticle
}