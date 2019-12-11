'use strict';

const bcrypt = require('bcryptjs');

const createHashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    createHashPassword,
    checkPassword
}