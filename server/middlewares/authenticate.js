const jwt = require('../helpers/jwt')

module.exports = (req,res,next)=>{
    try{
        const decoded = jwt.verifyToken(req.headers.access_token)
        req.decoded = decoded
        next()
    }catch(err){
        next(err)
    }
}