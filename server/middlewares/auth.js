const jwt = require("jsonwebtoken");
const Article = require("../models/article");

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

function authorization(req, res, next) {
  Article.findById(req.params.articleId)
    .then(response => {
      if (!response) {
        throw {
          status: 404,
          message: "Article Not Found!"
        };
      } else {
        if (response.author === req.decoded.name) {
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized user"
          };
        }
      }
    })
    .catch(next);
}

function authorizationMyArticle(req, res, next) {
  let name = req.decoded.name;
  Article.find({
    author: name
  })
    .then(response => {
      if (response.length === 0) {
        throw {
          status: 404,
          message: "You No Have Article"
        };
      } else {
        next();
      }
    })
    .catch(next);
}

module.exports = {
  authentication,
  authorization,
  authorizationMyArticle
};
