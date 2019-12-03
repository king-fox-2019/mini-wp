const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  try {
    let token = req.headers.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication
};
