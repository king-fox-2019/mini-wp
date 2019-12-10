const bcrypt = require('bcryptjs');

function generatePass(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function checkPassword(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
	generatePass,
	checkPassword
}
