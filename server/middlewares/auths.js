const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')

function authentication(req,res,next){
    if(req.headers.access_token){
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
        .then(user=>{
            if(user){
                next()
            }
            else throw {name:400,message:'you are not authenticated'}
        })
        .catch(err=>next(err))
    }
}

module.exports = {authentication}