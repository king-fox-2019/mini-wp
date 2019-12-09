const Article = require("../models/article");

class ArticleController {
  static create(req, res, next) {
    const { title, content, image, tag } = req.body;
    let splitTag = tag.split(",");
    console.log(splitTag);
    Article.create({
      title,
      content,
      image,
      tag: splitTag,
      author: req.decoded.name
    })
      .then(response => {
        console.log(response);
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

  static searchByTag(req, res, next) {
    const tag = req.params.tag;
    if (tag === "all") {
      Article.find()
        .then(response => {
          if (response.length !== 0) {
            res.status(200).json(response);
          } else {
            throw {
              status: 404,
              message: "No Match With This Tag"
            };
          }
        })
        .catch(next);
    } else {
      Article.find({
        tag: tag
      })
        .then(response => {
          if (response.length !== 0) {
            res.status(200).json(response);
          } else {
            throw {
              status: 404,
              message: "No Match With This Tag"
            };
          }
        })
        .catch(next);
    }
  }

  static searchByTagMyArticle(req, res, next) {
    const tag = req.params.tag;
    const name = req.decoded.name;
    if (tag === "all") {
      Article.find({
        author: name
      })
        .then(response => {
          if (response.length !== 0) {
            res.status(200).json(response);
          } else {
            throw {
              status: 404,
              message: "No Match With This Tag"
            };
          }
        })
        .catch(next);
    } else {
      Article.find({
        author: name,
        tag: tag
      })
        .then(response => {
          if (response.length !== 0) {
            res.status(200).json(response);
          } else {
            throw {
              status: 404,
              message: "No Match With This Tag"
            };
          }
        })
        .catch(next);
    }
  }

  static deleteArticle(req, res, next) {
    const articleId = req.params.articleId;
    Article.deleteOne({
      _id: articleId
    })
      .then(response => {
        res.status(200).json({
          message: "Success Delete Article"
        });
      })
      .catch(next);
  }
}

module.exports = ArticleController;
