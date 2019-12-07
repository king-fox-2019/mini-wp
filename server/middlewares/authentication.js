const {verifyToken} = require('../helpers/tokenGenerator')
const User = require('../models/User')


function authentication(req,res,next){
    try{
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken._id)
        .then(user => {
            if(user){
                req.loggedUser = decodedToken
                next()
            }else{
                next({
                    status: 401,
                    message: 'Authentication Failed'
                })
            }
        })
        .catch(next)
    }
    catch (err){
        res.status(500).json({
            message : "authentication failed"
        })
    }
}

module.exports = authentication