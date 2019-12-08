const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')
const Article = require('../models/article')

function authentication(req, res, next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken.id)
            .then(user => {
                if(user) {
                    req.loggedUser = decodedToken
                    next()
                } else {
                    next({ status: 401, message: 'Authentication failed' })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ status: 401, message: err })
    }
}

function authorization(req, res, next) {
    let { id } = req.params
    Article.findById(id)
        .then(article => {
            if(article && article.author == req.loggedUser.id) {
                next()
            } else if(!article) {
                next({ status: 404, message: "Data not found" })
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(next)
}

module.exports = {
    authentication, authorization
}