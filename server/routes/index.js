const express = require("express");
const router = express.Router();
const articleRouter = require("./articleRouter");
const userRouter = require("./userRouter");

router.use("/articles", articleRouter);
router.use("/user", userRouter);

module.exports = router;