const bcrypt = require('bcryptjs')

function hash(pass) {
    return bcrypt.hashSync(pass, 6)
}

function deHash(user_pass, db_pass) {
    return bcrypt.compareSync(user_pass, db_pass)
}

module.exports = {
    hash,
    deHash
}