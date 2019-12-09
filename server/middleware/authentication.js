const jwt = require('../helpers/jwt.js');

module.exports = {
    authentication: function(req, res, next) {
        console.log('authorization invoked');

        if(req.headers.token) {
            console.log('req.headers.token => ',req.headers.token);
            try {
                let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
                console.log('process.env.JWT_SECRET => ',process.env.JWT_SECRET);
                console.log('decoded => ',decoded);
                req.decoded = decoded;

                User.findById(req.decode.id)
                    .then(( user ) => {
                        if(user){
                            next();
                        } else {
                            next({status:401, message : "Not authorized"})
                        }
                    })
                    .catch(next) 
            } catch(error) {
                console.log('error => ',error);
                res.status(400).json({ message: 'Invalid JWT Token' })
            }
        } else {
            console.log('req.headers.token is undefined');
            res.status(400).json({ message: 'Please Login First' })
        }
    }
}


