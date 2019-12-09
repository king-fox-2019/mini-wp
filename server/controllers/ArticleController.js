const Article = require("../models/Article");

class ArticleController {
  static createArticle(req, res, next) {
    const { title, content } = req.body;
    console.log(req.payload);
    const docs = {
      title,
      content,
      author: req.payload._id
    };
    if (req.body.featured_image) docs.featured_image = req.body.featured_image;
    Article.create(docs)
      .then(article => {
        res.status(201).json(article);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json({ message: err });
      });
  }
  static readArticle(req, res, next) {
    const keys = [`title`, `content`];
    const filter = {};
    if (req.payload._id) {
      filter.author = req.payload._id;
    }
    keys.forEach(key => {
      if (req.query[key]) filter[key] = req.query[key];
    });
    Article.find(filter)
      .populate("author")
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(err => {
        res.status(500).json("Internal Server Error");
        console.log(err);
      });
  }
  static updateArticle(req, res, next) {
    const keys = Object.keys(req.body);
    const id = req.params.id;
    const options = {
      new: true,
      omitUndefined: true
    };
    const update = {};
    keys.forEach(key => {
      if (req.body[key]) update[key] = req.body[key];
    });
    Article.findByIdAndUpdate(id, update, options)
      .then(updatedArticle => {
        res.status(200).json(updatedArticle);
      })
      .catch(err => {
        res.status(500).json("Internal Server Error");
        console.log(err);
      });
  }
  static deleteArticle(req, res, next) {
    const id = req.params.id;
    const options = {
      rawResult: true
    };
    Article.findByIdAndDelete(id, options)
      .then(result => {
        if (result.ok > 0) {
          res.status(200).json(result);
        } else res.status(404).json({ message: "Article not found" });
      })
      .catch(err => {
        res.status(500).json("Internal Server Error");
        console.log(err);
      });
  }
}

module.exports = ArticleController;
