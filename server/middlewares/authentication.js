const { decodeToken } = require('../helpers/jwt')
const Author = require('../models/author')

const authentication = (req, res, next) => {
    try {
        const author = decodeToken(req.headers.access_token)
        Author.findById(author.id)
            .then(author => {
                if (author) {
                    req.decodedID = author._id
                    next()
                }
                else throw ({ status: 401, message: 'Authentication Failed' })
            })
            .catch(next)
    }
    catch (error) {
        next(error)
    }
}

module.exports = authentication