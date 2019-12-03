const { verifyToken } = require('../helpers/jwt')
const UserModel = require('../models/user')
const ArticleModel = require('../models/article')

function authentication(req, res, next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        UserModel.findById(decodedToken.id)
            .then(user => {
                if(user){
                    req.loggedUser = decodedToken
                    next()
                }
                else{
                    next({
                        status: 401,
                        message: 'Authentication Failed'
                    })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ 
            status: 401,
            message: err 
        })
    }
}
function authorization(req, res, next){
    ArticleModel.findOne({ _id : req.params.id})
        .then(result => {
            if(!result){
                next({ status: 404, message: 'Not Found' })
            }
            else if(result.author == req.loggedUser.id){
                next()
            }
            else{
                next({ 
                    status: 403, 
                    message: 'Not Authorized' 
                })
            }
        })
        .catch(next)
}
module.exports = {authentication, authorization}