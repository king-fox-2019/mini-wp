const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type : String,
        unique : true
    },
    username:{
        type : String,
        unique : true
    },
    password : String
});

const user = mongoose.model('User', userSchema)

module.exports = user