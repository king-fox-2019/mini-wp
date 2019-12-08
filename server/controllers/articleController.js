const Article = require("../models/article");

class ArticleController {
  static create(req, res, next) {
    const { title, content, image, tag } = req.body;
    Article.create({
      title,
      content,
      image,
      tag,
      author: req.decoded.name
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
        res.status(200).json(response);
      })
      .catch(next);
  }

  static readMyArticle(req, res, next) {
    const name = req.decoded.name;
    Article.find({
      author: name
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }
}

module.exports = ArticleController;
