const { verifyToken } = require('../helper/jwt')
const User = require('../model/User')

module.exports = {
    authentication: (req,res,next)=>{
        try{
            console.log('AUTHENTICATION RUNNING')
            if( !req.headers.access_token)
                next ({ status:403, message:'token is not provided'})

            const decoded = verifyToken( req.headers.access_token )
            User.findOne({ 
                _id:decoded._id
            })
            .then(result=>{
                if(result)
                  {
                    req.decodedUser = result
                    next()
                  }
                else 
                  {
                    throw err
                  }
                
            })
            .catch(err=>{
                next({ status:403, message:'invalid requirement; authentication not granted'})
            })
        }
        catch(err){
            next
        }
    }
}
