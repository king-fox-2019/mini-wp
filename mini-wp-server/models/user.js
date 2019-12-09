"use strict"

const mongoose = require('mongoose');
const { hashPass } = require('../helpers/bcrypt')

const UserSchema = new mongoose.Schema ({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', function(next) {
  this.password = hashPass(this.password);
  this.email = this.email.toLowerCase();
  next();
})

module.exports = mongoose.model('User', UserSchema);