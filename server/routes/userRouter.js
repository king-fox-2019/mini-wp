const express = require("express");
const user = express.Router();
const { userController } = require("../controllers");
const { authentication } = require("../middlewares/auth");

user.post("/signup", userController.signup);
user.post("/signin", userController.signin);
user.post("/signin/google", userController.signinGoogle)

user.use(authentication);
user.get("/myArticles", userController.showArticles);
user.get("/:userId", userController.getUser);
// user.put('/:userId', userController.editUser);
// user.patch('/:userId', userController.editUserSpecified);
// user.delete('/:userId', userController.deleteUser);

module.exports = user;