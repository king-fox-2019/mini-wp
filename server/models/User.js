const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestampsPlugin = require('mongoose-timestamp')
const {hashPassword} = require('../helpers/bcrypt')


const userSchema = new Schema({
   name: String,
   username: {
      type: String,
      required: [true, 'Please enter your username'],
      unique: true,
      minlength: [5, 'Minimum username length is 5 characters'],
      maxlength: [20, 'Maximum username length is 20 characters']
   },
   email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: [true, 'Email has been used'],
      validate: {
         validator: (v) => {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
         }
      }
   },
   password: {
      type: String,
      required: ['true', 'Please enter your password'],
      minlength: [5, 'Minimum password length is 5 characters'],
      maxlength: [20, 'Maximum password length is 20 characters']
   },
   image: {
      type: String,
      default: ''
   },
   gSignIn: {
      type: Boolean,
      default: false
   }
})

userSchema.plugin(timestampsPlugin)

userSchema.pre('save', function(next) {
   if(!this.gSignIn) {
      this.password = hashPassword(this.password)
      next()
   }
   else {
      this.password = Math.random().toString(36).slice(-8)
      this.password = hashPassword(this.password)
      next()
   }
})

const User = mongoose.model('user', userSchema)

module.exports = User