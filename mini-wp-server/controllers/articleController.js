"use strict";

const Article = require("../models/article");

class ArticleController {
  static create(req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let image = req.file.cloudStoragePublicUrl;
    let tagsArr = req.body.tags.split(", ");
    Article.create({
      title: title,
      content: content,
      tags: tagsArr,
      image: image,
      UserId: req.decoded.id
    })
      .then(article => {
        res.status(201).json(article);
      })
      .catch(next);
  }

  static showAll(req, res, next) {
    Article.find({ UserId: req.decoded.id })
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(next);
  }

  static showOne(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if (!article) {
          let err = {
            status: 404,
            msg: "Article not found"
          };
          next(err);
        } else {
          res.status(200).json(article);
        }
      })
      .catch(next);
  }

  static update(req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let tagsArr = req.body.tags.split(", ");
    let image = req.file.cloudStoragePublicUrl;
    Article.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
        image: image,
        tags: tagsArr
      },
      { new: true }
    )
      .then(article => {
        res.status(201).json(article);
      })
      .catch(next);
  }

  static remove(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({ message: "article successfully deleted" });
      })
      .catch(next);
  }

  static filter(req, res) {
    Article.find({
      title: new RegExp(req.params.value, "i"),
      UserId: req.decoded.id
    })
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  }
}

module.exports = ArticleController;
