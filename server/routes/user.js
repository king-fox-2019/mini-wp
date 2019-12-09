const router = require("express").Router();
const userController = require("../controllers/UserController");
const googleSignIn = require("../middlewares/googleSignIn");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/gsignin", userController.googleLogin);

module.exports = router;
