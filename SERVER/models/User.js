const mongoose = require('mongoose')
const { Schema } = mongoose
const { generateHash, compareHash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your username!']
  },
  email: {
    type: String,
    unique: [true, 'Email address has already been used!'],
    required: [true, 'Please input your email address!'],
    validate: {
      validator: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: [5, 'Your password is too short! Its length must be beween 5-15 characters.'],
    maxlength: [15, 'Your password is too long! Its length must be beween 5-15 characters.'],
  }
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  let currentPassword = this.password
  this.password = generateHash(currentPassword)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User