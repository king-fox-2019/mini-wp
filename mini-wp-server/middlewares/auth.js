"use strict";

const { verifyToken } = require("../helpers/jwt");
const Article = require("../models/article");

module.exports = {
  authentication(req, res, next) {
    if (!req.headers.access_token) {
      throw { errorCode: 400, message: "Need to be authenticated" };
    }
    try {
      req.decoded = verifyToken(req.headers.access_token);
      next();
    } catch (err) {
      next({ status: 401, message: "You must log in first" });
    }
  },

  authorization(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if (article) {
          if (String(article.UserId) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 401, message: "Unauthorized process!" });
          }
        } else {
          next({ status: 404, message: "Article is not found" });
        }
      })
      .catch(next);
  }
};
