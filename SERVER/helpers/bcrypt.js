const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))

function generateHash(password) {
  return bcrypt.hashSync(password, salt)
}

function verifyHash(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { generateHash, verifyHash }
