const express = require("express");
const article = express.Router();
const { articleController } = require("../controllers");


article.get("/", articleController.showArticles);
article.post("/", articleController.addArticle);

article.get("/:articleId", articleController.showArticle);
article.put("/:articleId", articleController.editArticle);
article.patch("/:articleId", articleController.editArticleSpecified);
article.delete("/:articleId", articleController.deleteArticle);

module.exports = article;