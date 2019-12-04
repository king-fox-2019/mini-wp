const express = require("express");
const user = express.Router();
const { userController } = require("../controllers");

user.post("/register", userController.register);
user.post("/signin", userController.signin);
user.get("/", userController.allUsers);
user.patch("/:userId", userController.editUser);
user.get("/:userId", userController.userInfo);
user.delete("/:userId", userController.deleteUser);


module.exports = user;