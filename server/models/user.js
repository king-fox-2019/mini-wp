const mongoose = require('mongoose')
const { Schema } = mongoose
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        validate: [{validator: isNameUnique, msg: 'username already registered'}]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [{ validator: isEmailUnique, msg: 'email already registered' }, { validator: isEmail, msg: 'invalid email' }]
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'min 6 char']
    }
}, {versionKey: false})

function isNameUnique(value) {
    return mongoose.models['User'].findOne({ name: value })
      .then(found => {
        if (found) return false
        else return true
      })
  }

function isEmailUnique(value) {
    return mongoose.models['User'].findOne({ email: value })
      .then(found => {
        if (found) return false
        else return true
      })
  }
  
function isEmail(value) {
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return regex.test(value)
  }

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User