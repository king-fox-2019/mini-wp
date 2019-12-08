const jwt = require("jsonwebtoken");
const { User, Article } = require("../models");

function authentication(req, res, next) {
  if (req.headers.access_token) {
    let payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    User.findOne({ email: payload.email})
      .then(user => {
        if (user || user.gSignIn) {
          req.decoded = payload;
          next()
        } else {
          throw { status: 401, message: 'Invalid access token'}
        }
      })
      .catch(next)
  } else {
    next({ status: 401, message: 'Invalid access token -'})
  }
}

function authorization(req, res, next) {
  Article.findById(req.params.articleId)
    .then(article => {
      if (article.author == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

module.exports = {
  authentication,
  authorization
}