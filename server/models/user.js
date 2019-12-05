const {hashPassword} = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

userSchema.pre('save',function(next){
    User.findOne({email:this.email})
    .then(email=>{
        if(email) throw {name:'400',message:'email already exist'}
        else{
            this.password = hashPassword(this.password)
            next()
        }
    })
    .catch(err=>next(err))
})

const User = mongoose.model('User',userSchema)

module.exports = User