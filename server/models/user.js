const { hashPassword } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const { Schema, model  } = mongoose

const UserSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required']
    },
    email : {
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format'],
        unique:true  
    },
    password : {
        type : String,
        required: [true, 'password is required'],
        minlength: [4, 'Password Minimum Contain 4 Character']  
    },
    image : {
        type : Array,
        validate : {
            validator : function(value){
                return value.length > 0 ? true : false
            },
            message: props => `image is required`
        }
    }
},{
    versionKey: false
})

UserSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

module.exports = model('User',UserSchema)