const express = require("express");
const article = express.Router();
const { articleController } = require("../controllers");
const { authentication, authorization } = require("../middlewares/auth");
const  gcsMiddlewares = require("../middlewares/google-cloud-storage")
const multer = require("multer");

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
});

article.use(authentication)
article.get("/", articleController.showArticles);
article.get("/:articleId", articleController.showArticle);

article.post("/", upload.single('featured_img'), gcsMiddlewares.sendUploadToGCS, articleController.addArticle);
article.patch("/:articleId", authorization, upload.single('featured_img'), gcsMiddlewares.sendUploadToGCS, articleController.editArticleSpecified);
article.delete("/:articleId", authorization, articleController.deleteArticle);
// article.put("/:articleId", articleController.editArticle);

module.exports = article;