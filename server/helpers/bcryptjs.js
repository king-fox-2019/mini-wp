const bcrypt = require('bcryptjs');

const hash = (password) => {
    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(password, salt, (err, hashed)=> {
            return hashed
        })
    })
}

const compare = (passwordInput, passowordDB) => {
    bcrypt.compare(password, passowordDB, (err, succ)=>{
        return succ
    })
}

module.exports = {
    hash,
    compare
}