const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {encrypt} = require('../helpers/bcrypt')

const userSchema = new Schema({
  email:  {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(email);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', function(next){
  this.password = encrypt(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User