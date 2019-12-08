const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function generateToken(payload) {
  return jwt.sign(payload, secret)
}

function verifyToken(payload) {
  return jwt.verify(payload, secret)
}

module.exports = { generateToken, verifyToken }