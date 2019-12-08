const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(5)

function generateHash(password)
{
    return bcryptjs.hashSync(password, salt)
}

function comparePassword(inputPassword, queryPassword)
{
    return bcryptjs.compareSync(inputPassword, queryPassword)
}

module.exports = {
    generateHash,
    comparePassword
}