const router = require("express").Router();
const userRouter = require("./user");
const articleRouter = require("./artilce");

router.get("/", (req, res, next) => {
  res.status(404).json({
    message: "Not Found"
  });
});

router.use("/users", userRouter);
router.use("/articles", articleRouter);

module.exports = router;
