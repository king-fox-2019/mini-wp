const jwt = require("../helpers/jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.access_token;
    const payload = jwt.verifyToken(accessToken);
    req.payload = payload;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    // next(err)
  }
};
