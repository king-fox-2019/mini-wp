const express = require("express");
const router = express.Router();
const articleRouter = require("./articleRoutes");

router.use("/articles", articleRouter);

module.exports = router;