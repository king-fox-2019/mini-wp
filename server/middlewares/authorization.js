const Article = require('../models/article')
// const {decodeToken} = require('../helpers/jwt')
const mongoose = require('mongoose')


function authorization(req, res, next) {

    try {
        Article.findOne({
            _id: req.params.id
        })
            .then(article => {
                if (!article) {
                    throw ({
                        status: 404,
                        message: 'Article already deleted'
                    })
                } else {
                    if (article.author.equals(req.decodedID)) {
                        next()
                    } else {
                        throw ({
                            status: 401,
                            message: 'You are not an authorized author.'
                        })
                    }
                }
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }

}

module.exports = authorization