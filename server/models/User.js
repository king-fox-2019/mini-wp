const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
      type: String,
      required: [true, 'username required!'],
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email required!'],
    unique: [true, 'email must unique'],
    validate: [(val) => {
      return /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    }, 'email format invalid']
  },
  password: {
    type: String,
    required: [true, 'password required!'],
    minlength:[6,'password minimun length is 6 caharacter']
  }
}, { timestamps: true, versionKey: false });
 

const User = mongoose.model('User', userSchema);


userSchema.path('email').validate((v) => {
  return new Promise((resolve, reject) => {
    User.find()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].email === v) {
          reject(new Error('email must unique'));
        }
      }
      resolve();
    })
    .catch(err => {
      reject(new Error(err));
    })
  })
})

module.exports = User;