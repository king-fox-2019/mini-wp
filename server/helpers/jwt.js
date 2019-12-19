const jwt = require('jsonwebtoken')

function generateAccessToken(payload) {
   return jwt.sign(payload, process.env.JWT_SECRET)
}

function verifyAccessToken(access_token, callback) {
   jwt.verify(access_token, process.env.JWT_SECRET, callback)
}

module.exports = {
   generateAccessToken,
   verifyAccessToken
}