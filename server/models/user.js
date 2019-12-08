const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save',function(next){
  User.findOne({email:this.email})
  .then(user=>{
    if(user) throw {name:'400',message:'email already taken'}
    else next()
  })
  .catch(err=>next(err))
})

const User = mongoose.model("User", userSchema);

module.exports = User;
