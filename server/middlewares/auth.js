const { deceodeToken } = require('../helpers/jwt'),
    User = require('../models/user'),
    Article = require('../models/artilcle')

function authenticate(req, res, next) {
    try{
        req.loggedUserId = deceodeToken(req.headers.token).id
        User.findOne({_id: req.loggedUserId})
            .then(user => {
                if(!user){
                    next({status: 401, message: "Authentication Failed"})
                } else {
                    next()
                }
            })
            .catch(next)
    } catch(err){
        next(err)
    }
}

function authorize(req, res, next) {
    try {
        Article.findOne({_id: req.params.id})
            .then(article => {
                if(!article){
                    next({status: 404, message: "Article not found"})
                } else if(article.author != req.loggedUserId) {
                    next({status: 401, message: "Authorization Failed"})
                } else {
                    next()
                }
            })
            .catch(next)
    } catch(err) {
        next(err)
    }
}

module.exports = {
    authenticate,
    authorize
}