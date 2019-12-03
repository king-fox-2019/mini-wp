const router = require("express").Router();
const userRouter = require("./user");

router.get("/", (req, res, next) => {
  res.status(404).json({
    message: "Not Found"
  });
});

router.use("/users", userRouter);

module.exports = router;
