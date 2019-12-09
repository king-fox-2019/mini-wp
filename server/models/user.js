const { Schema, model, models } = require('mongoose')
const bcrypt = require('bcryptjs')

const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [
      {
        // validate is unique
        validator: function (val) {
          return new Promise(function (resolve, reject) {
            models.User.findOne({ email: val })
              .then(function (user) {
                if (user) resolve(false)
                resolve(true)
              })
              .catch(function (err) {
                reject(err)
              })
          })
        },
        msg: 'Email is already registered'
      },
      {
        // validate regex email
        validator: function (val) {
          const regex = new RegExp(emailRegex)
          return regex.test(val)
        },
        msg: 'Email is invalid'
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password length min 6 characters']
  },
})

userSchema.post('validate', function (user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
})


const User = model('User', userSchema)


module.exports = { User }
