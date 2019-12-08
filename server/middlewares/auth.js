const { decodeToken } = require('../helpers/jwt'),
    User = require('../models/user')

function authenticate(req, res, next){
    try {
        req.UserId = decodeToken(req.headers.token).id
        User.findOne({_id: req.UserId})
            .then(user => {
                if(!user) {
                    next({ status: 401, message: 'Authentication Failed' })
                } else {
                    next()
                }
            })
            .catch(next)
    }
    catch(err) {
        next(err)
    }
}

module.exports = { authenticate }