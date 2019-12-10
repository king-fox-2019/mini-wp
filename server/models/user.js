const { hash } = require('../helpers/bcrypt')
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address.'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

