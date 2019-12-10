const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generatePass } = require('../helpers/encryptPass.js');

const UserSchema = new Schema({
    username : {
        type : String,
        required : [true, "username required"]
    },
    email : {
        type : String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
        required : [true, "email required"],
        validate : {
            validator : function(){
                return new Promise((resolve,reject)=>{
                    User.findOne({
                        email : this.email
                    })
                    .then(email=>{
                        if (email){
                            resolve(false)
                        }
                        else{
                            resolve(true)
                        }
                    })
                    .catch(err =>{
                        resolve(false)
                    })
                })
            }, message : "email already registered"
        }
    },
    password : {
        type : String,
        required :[true, "password is required"]}
},{ timestamps : true, versionKey :false })

UserSchema.pre('save', function(next){
    let password = generatePass(this.password)
    this.password = password
    next();
})

const User = mongoose.model("User", UserSchema)

module.exports = User
