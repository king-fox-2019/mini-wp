const Article = require("../models/article");

class ArticleController {
  static create(req, res, next) {
    const { title, content, image, tag } = req.body;
    Article.create({
      title,
      content,
      image,
      tag,
      author: req.decoded.id
    })
      .then(response => {
        res.status(201).json({
          response,
          message: "Success Create New Article"
        });
      })
      .catch(next);
  }

  static readAll(req, res, next) {
    Article.find()
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(next);
  }

  static readMyArticle(req, res, next) {
    const id = req.decoded.id;
    Article.find({
      author: id
    })
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(next);
  }
}

module.exports = ArticleController;
