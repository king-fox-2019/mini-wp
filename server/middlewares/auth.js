const {verify} = require('../helpers/jwt')
const User = require('../model/user')

function auth(req, res, next) {
    try {
        // console.log(req.headers);
        req.decode = verify(req.headers.access_token)
        console.log(req.decode);
        User.findById(req.decode.id)
        .then((user) => {
            if(!user || user.length) next({msg:"User Undefined", status:404})
        })
        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports = auth