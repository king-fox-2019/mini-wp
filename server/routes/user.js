const router = require("express").Router();
const User = require("../controllers/userController");

router.post("/signup", User.signUp);
router.post("/signin", User.signIn);

module.exports = router;
