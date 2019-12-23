const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be empty']
    },
    email:{
        type: String,
        required: [true, 'Email cannot be empty'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please input the valid email format'],
        validate:{
            validator: function(value){
                return User.findOne({
                    email: value
                })
                .then(user => {
                    if(user) return false
                    else return true
                })
            },
            message: `Email is already registered`
        }
    },
    password:{
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [6, 'Your password min have 6 digits']
    },
    favorites:[{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    avatar:{
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
})

userSchema.post('validate', function(doc,next){
    this.password = bcrypt.hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User