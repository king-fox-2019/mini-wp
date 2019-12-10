const { Schema, model } = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Input Your Name"]
    },
    email: {
      type: String,
      required: [true, "Please Input Your Email"],
      validate: {
        validator: function(value) {
          return User.findOne({
            email: value
          }).then(response => {
            if (response) {
              return false;
            }
          });
        },
        message: "Email Already Exists"
      },
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "email is not valid"
      ]
    },
    password: {
      type: String,
      required: [true, "Please Input Your Password"],
      minlength: [7, "Password Minimum 7 Characters"]
    },
    image: {
      type: String,
      required: [true, "Please Input Your Image"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  this.password = hashPassword(this.password);
  next();
});

const User = model("User", userSchema);

module.exports = User;
