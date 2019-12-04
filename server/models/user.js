'use strict';

const { hash, compare } = require('../helpers/bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String
});

UserSchema.pre('save', function(next){
    let user = this
    user.password = hash(user.password)
    next()
})

const User = mongoose.model('User', UserSchema);
module.exports = User;