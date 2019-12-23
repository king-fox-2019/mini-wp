const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  hashPassword,
  compare
}