const mongoose = require('mongoose'),
    { Schema } = mongoose,
    { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        validate: {
            validator: function(email){
                return User.findOne({ email })
                    .then(user => {
                        if(user){
                            return false
                        }
                    })
            },
            message: props => 'already registered'
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
})

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User