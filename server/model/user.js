const mongoose = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "please use another unique name"],
        required: 'Username is required'
    },
    email: {
        type: String,
        unique: [true, "The email is already in use, please use another email or login with an existing account"],
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required'
    }
})

UserSchema.pre('save', function(next) {
    this.password = hash(this.password)
    next()
});
 
module.exports = mongoose.model('User', UserSchema)