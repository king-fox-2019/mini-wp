const { Schema, model, models } = require('mongoose')
const { hash } = require('../helpers/passwordHandler')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
      validate: [
        {
          validator(val) {
            return models.User.findOne({ username: val }).then(user => {
              if (user) return false
              return true
            })
          },
          msg: 'Username already taken'
        },
        {
          validator(val) {
            return /^[a-z0-9_.]+$/.test(val)
          },
          msg: 'Invalid username format'
        }
      ]
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: [
        {
          validator(val) {
            return models.User.findOne({ email: val }).then(user => {
              if (user) return false
              return true
            })
          },
          msg: 'Email already registered'
        },
        {
          validator(val) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              val
            )
          },
          msg: 'Invalid email format'
        }
      ]
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [6, 'Password min length 6']
    },
    fullName: {
      type: String,
      validate: {
        validator(val) {
          return /^[A-Za-z ]+$/.test(val)
        },
        msg: 'Invalid full name format'
      }
    }
  },
  { versionKey: false }
)

userSchema.post('validate', function(doc, next) {
  doc.password = hash(doc.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
