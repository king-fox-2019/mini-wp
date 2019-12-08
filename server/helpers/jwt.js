'use strict';

const jwt = require('jsonwebtoken');
const secret = 'mini-WP Hacktiv8';

const generateToken = (payload) => {
    return jwt.sign(payload, secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    decodeToken
}
