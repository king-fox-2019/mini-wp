const bcrypt = require('bcryptjs')

function PasswordHasher(password){
    let salt = bcrypt.genSaltSync(11)
    return bcrypt.hashSync(password,salt)
}

function VerifyPassword(password,userPassword){
    return bcrypt.compareSync(password,userPassword)
}

module.exports = {
    PasswordHasher,
    VerifyPassword
}
