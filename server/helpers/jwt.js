const jwt = require('jsonwebtoken')

function genToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

function verify(payload) {
    // console.log(payload, process.env.JWT_SECRET);
    return jwt.verify(payload, process.env.JWT_SECRET)
}

module.exports = {
    genToken,
    verify
}