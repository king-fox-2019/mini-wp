const express = require("express");
const router = express.Router();
const articleRouter = require("./articleRoutes");
const userRouter = require("./userRouter");

router.use("/articles", articleRouter);
router.use("/users", userRouter);

module.exports = router;