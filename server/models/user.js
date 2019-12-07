const mongoose = require('mongoose'),
    { Schema } = mongoose,
    { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        validate: {
            validator: function(value) {
                return User.findOne({email: value})
                    .then(user => {
                        if(user){
                            return false
                        }
                    })
            },
            message: props => 'email already registered'
        },
        required: [true, 'enter email'],
    },
    password: {
        type: String,
        required: [true, 'enter password']
    }
})

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User