'use strict';

const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, `Please Enter Username, Username Cannot Be Empty !!!`],
        validate: {
            validator: (username) => {
                return User.findOne({ username })
                    .then(user => {
                        if (user) {
                            return false
                        }
                    })
            },
            message: props => `Username ${props.value} has been register, please try another username !!!`
        }
    },
    email: {
        type: String,
        required: [true, `Please Enter Email Address, Email Address Cannot Be Empty !!!`],
        validate: {
            validator: (email) => {
                return User.findOne({ email })
                    .then(user => {
                        if (user) {
                            return false
                        }
                    })
            },
            message: props => `Email ${props.value} has been register, please try another email !!!`
        }
    },
    password: {
        type: String,
        required: [true, `Please Enter Password, Password Cannot Be Empty !!!`]
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.createHashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;