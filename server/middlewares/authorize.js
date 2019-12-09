const Article = require('../models/Article');

module.exports = function(req, res, next) {
    try {
        Article
            .findOne({_id: req.params.id})
            .populate('user')
            .then( data => {
                if (data.user._id == req.decoded.id) {
                    next()
                } else {
                    let err = {
                        status: 401,
                        message: `No access.`
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    } catch(err) {
        err = {
            status: 404,
            message: `Not found.`
        }
        next(err);
    }
}